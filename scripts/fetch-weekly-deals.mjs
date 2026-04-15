import { readFile, writeFile } from 'fs/promises';
import https from 'https';
import { URL, URLSearchParams } from 'url';

const TOKEN_URL = 'https://api.kroger.com/v1/connect/oauth2/token';
const PRODUCTS_URL = 'https://api.kroger.com/v1/products';
const OUTPUT_PATH = 'data/weekly-deals.json';
const SEASONAL_PATH = 'data/seasonal-colorado.json';
const RECIPES_PATH = 'data/recipes-with-ingredients.json';

const STOPWORDS = new Set([
  'the',
  'and',
  'with',
  'for',
  'fresh',
  'dried',
  'large',
  'small',
  'medium',
  'whole',
  'sliced',
  'chopped',
  'diced',
  'minced',
  'cooked',
  'frozen',
  'canned',
  'optional'
]);

const UNIT_WORD_PATTERN = /^(?:cups?|tbsp|tsp|oz|lb|lbs|pounds?|cans?|cloves?|slices?|package|pkg|bunch|pinch|dash|to taste)\b\.?\s*/i;
const LEADING_QUANTITY_PATTERN = /^\s*(?:(?:\d+\s+\d\/\d)|(?:\d+\/?\d*)|(?:\d*\.\d+)|(?:\d+-\d+)|(?:[¼½¾⅓⅔⅛⅜⅝⅞]))\s*/;

function validateEnvironment() {
  const requiredVars = ['KROGER_CLIENT_ID', 'KROGER_CLIENT_SECRET', 'KROGER_LOCATION_ID'];
  const missing = [];

  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value || !value.trim()) {
      missing.push(varName);
      console.error(`Missing required environment variable: ${varName}`);
    }
  }

  if (missing.length > 0) {
    console.error(
      'To run locally: KROGER_CLIENT_ID=xxx KROGER_CLIENT_SECRET=xxx KROGER_LOCATION_ID=62000100 node ./scripts/fetch-weekly-deals.mjs'
    );
    process.exit(1);
  }
}

function httpsRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        const statusCode = res.statusCode || 0;

        if (statusCode < 200 || statusCode >= 300) {
          const err = new Error(`HTTP ${statusCode}: ${responseBody}`);
          err.statusCode = statusCode;
          err.responseBody = responseBody;
          reject(err);
          return;
        }

        try {
          const parsed = responseBody ? JSON.parse(responseBody) : {};
          resolve(parsed);
        } catch (error) {
          const err = new Error(`Failed to parse JSON response: ${error.message}. Body: ${responseBody}`);
          err.statusCode = statusCode;
          err.responseBody = responseBody;
          reject(err);
        }
      });
    });

    req.setTimeout(10000, () => {
      req.destroy(new Error('Request timed out after 10000ms'));
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function round2(value) {
  return Number(Number(value).toFixed(2));
}

function cleanIngredientPhrase(input) {
  if (!input) {
    return '';
  }

  let phrase = String(input).toLowerCase();
  phrase = phrase.replace(/\([^)]*\)/g, ' ');
  phrase = phrase.replace(/[^a-z0-9\s\/.-]/g, ' ');

  // Strip common leading quantity/unit prefixes like "1/2 cup" or "2 tbsp".
  let changed = true;
  while (changed) {
    const before = phrase;
    phrase = phrase.replace(LEADING_QUANTITY_PATTERN, '');
    phrase = phrase.replace(UNIT_WORD_PATTERN, '');
    changed = phrase !== before;
  }

  phrase = phrase.replace(/\b(?:to taste)\b/g, ' ');
  phrase = phrase.replace(/\s+/g, ' ').trim();
  return phrase;
}

function extractRecipeTerms(recipesData) {
  const terms = [];
  const recipes = Array.isArray(recipesData?.recipes) ? recipesData.recipes : [];

  for (const recipe of recipes) {
    const ingredients = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];
    for (const ingredient of ingredients) {
      const chunks = String(ingredient)
        .split(',')
        .map((chunk) => cleanIngredientPhrase(chunk));

      for (const chunk of chunks) {
        if (!chunk) {
          continue;
        }

        for (const word of chunk.split(/\s+/)) {
          if (word) {
            terms.push(word.trim());
          }
        }
      }
    }
  }

  return terms;
}

function buildSearchTerms(seasonalProduceKeys, recipeTerms) {
  const seasonalSet = new Set(
    seasonalProduceKeys
      .map((term) => String(term).toLowerCase().trim())
      .filter((term) => term.length >= 3 && !STOPWORDS.has(term))
  );

  const recipeSet = new Set(
    recipeTerms
      .map((term) => String(term).toLowerCase().trim())
      .filter((term) => term.length >= 3 && !STOPWORDS.has(term))
  );

  const combined = new Set([...seasonalSet, ...recipeSet]);
  const both = [];
  const onlySeasonal = [];
  const onlyRecipe = [];

  for (const term of combined) {
    const inSeasonal = seasonalSet.has(term);
    const inRecipe = recipeSet.has(term);
    if (inSeasonal && inRecipe) {
      both.push(term);
    } else if (inSeasonal) {
      onlySeasonal.push(term);
    } else {
      onlyRecipe.push(term);
    }
  }

  both.sort((a, b) => a.localeCompare(b));
  onlySeasonal.sort((a, b) => a.localeCompare(b));
  onlyRecipe.sort((a, b) => a.localeCompare(b));

  return [...both, ...onlySeasonal, ...onlyRecipe].slice(0, 60);
}

function pickImageUrl(images) {
  if (!Array.isArray(images) || images.length === 0) {
    return undefined;
  }

  const featuredImage = images.find((image) => image?.featured === true) || images[0];
  const sizes = Array.isArray(featuredImage?.sizes) ? featuredImage.sizes : [];
  if (sizes.length === 0) {
    return undefined;
  }

  const preferred = sizes.find((size) => size?.perspective === 'front') || sizes[0];
  return preferred?.url;
}

function computeWeekOf() {
  const date = new Date();
  const daysSinceLastWednesday = (date.getDay() + 4) % 7;
  date.setDate(date.getDate() - daysSinceLastWednesday);
  return date.toISOString().split('T')[0];
}

async function authenticate(clientId, clientSecret) {
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: 'product.compact'
  }).toString();

  const tokenUrl = new URL(TOKEN_URL);
  const options = {
    method: 'POST',
    protocol: tokenUrl.protocol,
    hostname: tokenUrl.hostname,
    path: tokenUrl.pathname,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authHeader}`,
      'Content-Length': Buffer.byteLength(body)
    }
  };

  const response = await httpsRequest(options, body);
  const token = response?.access_token;
  if (!token) {
    throw new Error(`Authentication response missing access_token: ${JSON.stringify(response)}`);
  }

  return token;
}

async function fetchDealsByTerms(terms, locationId, accessToken) {
  const deals = [];

  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i];
    const endpoint = new URL(PRODUCTS_URL);
    endpoint.searchParams.set('filter.term', term);
    endpoint.searchParams.set('filter.locationId', locationId);
    endpoint.searchParams.set('filter.limit', '5');
    endpoint.searchParams.set('filter.fulfillment', 'csp');

    const options = {
      method: 'GET',
      protocol: endpoint.protocol,
      hostname: endpoint.hostname,
      path: `${endpoint.pathname}${endpoint.search}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    };

    try {
      const response = await httpsRequest(options);
      const products = Array.isArray(response?.data) ? response.data : [];

      for (const product of products) {
        const item = Array.isArray(product?.items) ? product.items[0] : undefined;
        const price = item?.price;
        if (!price || typeof price.regular !== 'number' || typeof price.promo !== 'number') {
          continue;
        }

        if (price.promo >= price.regular) {
          continue;
        }

        const regularPrice = round2(price.regular);
        const promoPrice = round2(price.promo);
        const savings = round2(regularPrice - promoPrice);
        const savingsPct = regularPrice > 0 ? Math.round((savings / regularPrice) * 100) : 0;

        deals.push({
          term,
          name: product?.description,
          brand: product?.brand,
          upc: product?.upc,
          regularPrice,
          promoPrice,
          savings,
          savingsPct,
          size: item?.size,
          category: Array.isArray(product?.categories) ? product.categories[0] : undefined,
          imageUrl: pickImageUrl(product?.images)
        });
      }
    } catch (error) {
      console.warn(`Warning: failed to fetch products for term "${term}": ${error.message}`);
    }

    if ((i + 1) % 10 === 0) {
      console.log(`Fetched ${i + 1} / ${terms.length} terms...`);
    }

    if (i < terms.length - 1) {
      await sleep(250);
    }
  }

  const seen = new Set();
  return deals.filter((deal) => {
    if (!deal?.upc) {
      return false;
    }
    if (seen.has(deal.upc)) {
      return false;
    }
    seen.add(deal.upc);
    return true;
  });
}

async function buildTermList() {
  const [seasonalRaw, recipesRaw] = await Promise.all([
    readFile(SEASONAL_PATH, 'utf8'),
    readFile(RECIPES_PATH, 'utf8')
  ]);

  const seasonalData = JSON.parse(seasonalRaw);
  const recipesData = JSON.parse(recipesRaw);

  const seasonalProduceKeys = Object.keys(seasonalData?.produce || {});
  const recipeTerms = extractRecipeTerms(recipesData);

  return buildSearchTerms(seasonalProduceKeys, recipeTerms);
}

async function main() {
  validateEnvironment();

  const clientId = process.env.KROGER_CLIENT_ID.trim();
  const clientSecret = process.env.KROGER_CLIENT_SECRET.trim();
  const locationId = process.env.KROGER_LOCATION_ID.trim();

  let accessToken;
  try {
    accessToken = await authenticate(clientId, clientSecret);
  } catch (error) {
    console.error('Authentication failed.');
    console.error(error && error.stack ? error.stack : String(error));
    if (error?.responseBody) {
      console.error(`Full error response: ${error.responseBody}`);
    }
    process.exit(1);
  }

  console.log('Authentication successful.');

  const terms = await buildTermList();
  console.log(`Built search list: ${terms.length} terms`);

  const deals = await fetchDealsByTerms(terms, locationId, accessToken);
  deals.sort((a, b) => {
    if (b.savingsPct !== a.savingsPct) {
      return b.savingsPct - a.savingsPct;
    }
    return String(a.name || '').localeCompare(String(b.name || ''));
  });

  const weekOf = computeWeekOf();
  const output = {
    weekOf,
    locationId,
    chain: 'King Soopers',
    generatedAt: new Date().toISOString(),
    totalSearched: terms.length,
    totalDeals: deals.length,
    deals
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  console.log('');
  console.log('===== Kroger Deals Fetch Complete =====');
  console.log(`Terms searched: ${terms.length}`);
  console.log(`On-sale items found: ${deals.length}`);
  console.log(`Week of: ${weekOf}`);
  console.log(`Location: ${locationId}`);
  console.log('Output: data/weekly-deals.json');
  console.log('');
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});