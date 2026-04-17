import { readFile, writeFile } from 'fs/promises';
import https from 'https';
import { URL, URLSearchParams, fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createGunzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const TOKEN_URL = 'https://api.kroger.com/v1/connect/oauth2/token';
const PRODUCTS_URL = 'https://api.kroger.com/v1/products';
const OUTPUT_PATH = join(repoRoot, 'data', 'weekly-deals.json');
const INGREDIENT_PRICES_PATH = join(repoRoot, 'data', 'ingredient-prices.json');
const SEASONAL_PATH = 'data/seasonal-colorado.json';
const RECIPES_PATH = 'data/recipes-with-ingredients.json';

const CHAIN_LOCATIONS = [
  {
    chain: 'HARRIS TEETER',
    locationId: '00500113',
    name: 'Harris Teeter Charlotte Uptown',
    outputFile: 'data/deals-harris-teeter.json'
  },
  {
    chain: 'RALPHS',
    locationId: '70100255',
    name: 'Ralphs Los Angeles',
    outputFile: 'data/deals-ralphs.json'
  },
  {
    chain: 'FRED MEYER',
    locationId: '68200172',
    name: 'Fred Meyer Portland',
    outputFile: 'data/deals-fred-meyer.json'
  },
  {
    chain: 'SMITHS',
    locationId: '70900631',
    name: 'Smith\'s Salt Lake City',
    outputFile: 'data/deals-smiths.json'
  },
  {
    chain: 'FRYS',
    locationId: '62100013',
    name: 'Fry\'s Phoenix',
    outputFile: 'data/deals-frys.json'
  },
  {
    chain: 'MARIANOS',
    locationId: '62000526',
    name: 'Mariano\'s Chicago',
    outputFile: 'data/deals-marianos.json'
  }
];

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
  const requiredVars = ['KROGER_CLIENT_ID', 'KROGER_CLIENT_SECRET'];
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
      'To run locally: KROGER_CLIENT_ID=xxx KROGER_CLIENT_SECRET=xxx [KROGER_LOCATION_ID=62000100] node ./scripts/fetch-weekly-deals.mjs'
    );
    process.exit(1);
  }
}

function httpsRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      ...options,
      headers: {
        ...(options?.headers || {}),
        'Accept-Encoding': 'identity'
      }
    };

    const req = https.request(requestOptions, (res) => {
      const encoding = res.headers['content-encoding'];
      const stream = encoding === 'gzip' ? res.pipe(createGunzip()) : res;
      const chunks = [];

      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse JSON response: ${body.slice(0, 200)}`));
        }
      });
      stream.on('error', reject);
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
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  console.log(`Auth: using client_id starting with: ${clientId.slice(0, 6)}...`);
  console.log(`Auth: credential string length: ${(clientId + ':' + clientSecret).length} chars`);
  const postBody = 'grant_type=client_credentials&scope=product.compact';

  const tokenUrl = new URL(TOKEN_URL);
  const options = {
    method: 'POST',
    protocol: tokenUrl.protocol,
    hostname: tokenUrl.hostname,
    path: tokenUrl.pathname,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
      'Content-Length': Buffer.byteLength(postBody)
    }
  };

  const response = await httpsRequest(options, postBody);
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

async function fetchDealsForLocation(accessToken, locationId, searchTerms, outputPath, locationName) {
  const deals = await fetchDealsByTerms(searchTerms, locationId, accessToken);
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
    chain: locationName.includes('King Soopers') ? 'King Soopers' : locationName,
    generatedAt: new Date().toISOString(),
    totalSearched: searchTerms.length,
    totalDeals: deals.length,
    deals
  };

  await writeFile(join(repoRoot, outputPath), `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  return {
    dealsFound: deals.length,
    weekOf
  };
}

async function main() {
  validateEnvironment();

  const clientId = process.env.KROGER_CLIENT_ID.trim();
  const clientSecret = process.env.KROGER_CLIENT_SECRET.trim();

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

  const searchTerms = await buildTermList();
  console.log(`Built search list: ${searchTerms.length} terms`);

  const defaultResult = await fetchDealsForLocation(
    accessToken,
    process.env.KROGER_LOCATION_ID || '62000100',
    searchTerms,
    'data/weekly-deals.json',
    'King Soopers Belleview Square'
  );

  const defaultDealsRaw = await readFile(OUTPUT_PATH, 'utf8');
  const defaultDealsParsed = JSON.parse(defaultDealsRaw);
  const deals = Array.isArray(defaultDealsParsed?.deals) ? defaultDealsParsed.deals : [];
  const weekOf = defaultResult.weekOf;
  const defaultLocationId = process.env.KROGER_LOCATION_ID || '62000100';

  console.log('');
  console.log('===== Kroger Deals Fetch (Default) Complete =====');
  console.log(`Terms searched: ${searchTerms.length}`);
  console.log(`On-sale items found: ${defaultResult.dealsFound}`);
  console.log(`Week of: ${weekOf}`);
  console.log(`Location: ${defaultLocationId}`);
  console.log('Output: data/weekly-deals.json');

  // --- INGREDIENT PRICES SIDE OUTPUT ---
  let ingredientPricesData = {
    lastUpdated: '',
    prices: {}
  };

  try {
    const existingIngredientPricesRaw = await readFile(INGREDIENT_PRICES_PATH, 'utf8');
    const parsed = JSON.parse(existingIngredientPricesRaw);
    ingredientPricesData = {
      lastUpdated: typeof parsed?.lastUpdated === 'string' ? parsed.lastUpdated : '',
      prices: typeof parsed?.prices === 'object' && parsed?.prices !== null ? parsed.prices : {}
    };
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }

  const prices = ingredientPricesData.prices;
  const today = new Date().toISOString().split('T')[0];
  const touchedTerms = new Set();

  for (const deal of deals) {
    const term = String(deal?.term || '').toLowerCase().trim();
    if (!term || typeof deal?.regularPrice !== 'number') {
      continue;
    }

    touchedTerms.add(term);

    const existing = prices[term];
    if (!existing) {
      prices[term] = {
        term,
        name: String(deal?.name || ''),
        regularPrice: deal.regularPrice,
        unit: deal?.size ? String(deal.size) : '',
        lastSeen: today,
        weekOf,
        source: 'kroger_api',
        confidence: 'actual'
      };
      continue;
    }

    if (existing.regularPrice !== deal.regularPrice) {
      existing.term = term;
      existing.name = String(deal?.name || '');
      existing.regularPrice = deal.regularPrice;
      existing.unit = deal?.size ? String(deal.size) : '';
      existing.source = 'kroger_api';
      existing.confidence = 'actual';
    }

    existing.lastSeen = today;
    existing.weekOf = weekOf;
  }

  ingredientPricesData.lastUpdated = new Date().toISOString();

  await writeFile(INGREDIENT_PRICES_PATH, `${JSON.stringify(ingredientPricesData, null, 2)}\n`, 'utf8');

  console.log(`Ingredient prices updated: ${touchedTerms.size} terms with actual Kroger prices`);
  console.log('Output: data/ingredient-prices.json');
  console.log('');

  const chainResults = new Map();

  console.log('\n--- Fetching chain-specific deals ---');

  for (const chain of CHAIN_LOCATIONS) {
    try {
      console.log(`\nFetching deals for ${chain.name}...`);
      const result = await fetchDealsForLocation(
        accessToken,
        chain.locationId,
        searchTerms,
        chain.outputFile,
        chain.name
      );
      chainResults.set(chain.chain, result.dealsFound);
      console.log(`${chain.name}: ${result.dealsFound} deals found`);
    } catch (err) {
      console.error(`Failed to fetch deals for ${chain.name}: ${err.message}`);
      console.error('Continuing with remaining chains...');
    }

    // Rate limit pause between chains
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log('');
  console.log('===== Multi-Chain Deals Fetch Complete =====');
  console.log(`Default location (King Soopers): ${defaultResult.dealsFound} deals`);
  console.log(`Harris Teeter: ${chainResults.get('HARRIS TEETER') ?? 0} deals`);
  console.log(`Ralphs: ${chainResults.get('RALPHS') ?? 0} deals`);
  console.log(`Fred Meyer: ${chainResults.get('FRED MEYER') ?? 0} deals`);
  console.log(`Smith's: ${chainResults.get('SMITHS') ?? 0} deals`);
  console.log(`Fry's: ${chainResults.get('FRYS') ?? 0} deals`);
  console.log(`Mariano's: ${chainResults.get('MARIANOS') ?? 0} deals`);
  console.log('All output files written to data/');
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});