#!/usr/bin/env node

import fs from "node:fs/promises";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const RECIPES_DIR = path.join(ROOT_DIR, "recipes");
const OUTPUT_PATH = path.join(ROOT_DIR, "data", "recipes-with-ingredients.json");
const INDEX_PATH = path.join(ROOT_DIR, "data", "ingredient-index.json");
const SEASONAL_DATA_PATH = path.join(ROOT_DIR, "data", "seasonal-colorado.json");
const SEASONAL_OUTPUT_PATH = path.join(ROOT_DIR, "data", "seasonal-match.json");

const BING_SEARCH_URL = "https://www.bing.com/search";
const REQUEST_TIMEOUT_MS = 5000;
const ENRICH_CONCURRENCY = 6;

const TITLE_RULES = [
  [/chicken/, ["chicken"]],
  [/beef|hamburger|meatloaf|burger/, ["beef"]],
  [/pork|bbq|ribs?/, ["pork"]],
  [/salmon|shrimp|seafood|wonton/, ["seafood"]],
  [/taco|enchilada|chipotle/, ["tortilla", "onion", "cheese"]],
  [/stroganoff/, ["mushroom", "onion", "broth"]],
  [/lasagne|lasagna|spaghetti|penne|tortellini|mac\s*n\s*cheese/, ["pasta", "cheese"]],
  [/soup|stew|chili/, ["broth", "onion", "garlic"]],
  [/pizza/, ["flour", "cheese", "tomato sauce"]],
  [/rice/, ["rice"]],
  [/zucchini/, ["zucchini"]],
  [/broccoli/, ["broccoli"]],
  [/potato/, ["potato"]],
  [/lettuce wraps?/, ["lettuce"]],
  [/muffin|bread|biscuit/, ["flour", "butter", "baking powder"]],
  [/peanut/, ["peanut butter"]],
  [/pesto/, ["basil", "olive oil", "parmesan"]],
  [/cheese/, ["cheese"]]
];

const TITLE_NEGATION_RULES = [
  [/\bflourless\b/, ["flour"]],
  [/\bsugar[-\s]?free\b|\bno sugar\b/, ["sugar"]],
  [/\bdairy[-\s]?free\b|\bno dairy\b/, ["butter", "cheese", "milk", "cream"]],
  [/\begg[-\s]?free\b|\bno eggs?\b/, ["egg"]],
  [/\bgluten[-\s]?free\b|\bno gluten\b/, ["flour"]]
];

const BAD_SEARCH_HOSTS = ["pinterest.com", "facebook.com", "instagram.com"];

const INGREDIENT_ALIASES = {
  "chicken breast": ["chicken breasts", "boneless chicken", "chicken cutlet"],
  "chicken thighs": ["chicken thigh", "bone-in chicken"],
  "ground beef": ["beef mince", "minced beef"],
  "beef chuck": ["chuck roast", "chuck steak"],
  "pork shoulder": ["pork butt", "shoulder butt"],
  shrimp: ["prawns"],
  scallions: ["green onions", "spring onions"],
  cilantro: ["fresh cilantro", "coriander"],
  pasta: ["spaghetti", "penne", "linguine", "fettuccine", "rigatoni", "macaroni", "noodles"],
  rice: ["basmati rice", "jasmine rice", "white rice", "long-grain rice", "wild rice"],
  broth: ["chicken broth", "beef broth", "vegetable broth", "stock", "chicken stock", "beef stock"],
  cheese: ["cheddar", "mozzarella", "parmesan", "ricotta", "feta", "gruyere", "shredded cheese"],
  tomatoes: ["crushed tomatoes", "diced tomatoes", "canned tomatoes", "tomato sauce", "cherry tomatoes"]
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestText(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "user-agent": "recipes-bot/1.0 (+https://github.com/rmallorybpc/recipes)",
        accept: "text/html,application/json;q=0.9,*/*;q=0.8",
        ...(init.headers || {})
      }
    });

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch (_error) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function parseKnownRecipes(markdown, meal, style) {
  const lines = markdown.split(/\r?\n/);
  const recipes = [];
  let current = null;

  for (const line of lines) {
    const recipeMatch = line.match(/^\s*-\s+(?!Source:)(.+?)\s*$/);
    if (recipeMatch) {
      current = {
        title: recipeMatch[1].trim(),
        meal,
        style,
        source_url: null
      };
      recipes.push(current);
      continue;
    }

    const sourceMatch = line.match(/^\s*-\s+Source:\s*(https?:\/\/\S+)/i);
    if (sourceMatch && current) {
      current.source_url = sourceMatch[1].trim();
    }
  }

  return recipes;
}

function stripYamlValue(raw) {
  return raw.trim().replace(/^['"]|['"]$/g, "");
}

function parseRecipeFrontmatter(markdown) {
  const frontmatterMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!frontmatterMatch) {
    return null;
  }

  const fields = {};
  const lines = frontmatterMatch[1].split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^([a-zA-Z0-9_]+):\s*(.+)\s*$/);
    if (!match) {
      continue;
    }

    const [, key, value] = match;
    fields[key] = stripYamlValue(value);
  }

  return fields;
}

function recipeInventoryKey(meal, style, title) {
  return `${meal}::${style}::${title.toLowerCase().trim()}`;
}

async function walkKnownRecipeFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkKnownRecipeFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name === "known-recipes.md") {
      files.push(fullPath);
    }
  }

  return files;
}

async function walkRecipeMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkRecipeMarkdownFiles(fullPath)));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }

    if (entry.name === "known-recipes.md" || entry.name === "README.md" || entry.name === "recipe-template.md") {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

async function loadRecipeMetadata() {
  const recipeFiles = await walkRecipeMarkdownFiles(RECIPES_DIR);
  const metadata = new Map();

  for (const filePath of recipeFiles) {
    const relative = path.relative(RECIPES_DIR, filePath).split(path.sep);
    if (relative.length < 3) {
      continue;
    }

    const [meal, style] = relative;
    const markdown = await fs.readFile(filePath, "utf8");
    const frontmatter = parseRecipeFrontmatter(markdown);
    if (!frontmatter?.title) {
      continue;
    }

    metadata.set(recipeInventoryKey(meal, style, frontmatter.title), {
      source_url: frontmatter.source_url || null
    });
  }

  return metadata;
}

async function loadInventory() {
  const files = await walkKnownRecipeFiles(RECIPES_DIR);
  const recipeMetadata = await loadRecipeMetadata();
  const inventory = [];

  for (const filePath of files) {
    const relative = path.relative(RECIPES_DIR, filePath).split(path.sep);
    if (relative.length < 3) {
      continue;
    }

    const [meal, style] = relative;
    const markdown = await fs.readFile(filePath, "utf8");
    const parsed = parseKnownRecipes(markdown, meal, style).map((recipe) => {
      const metadata = recipeMetadata.get(recipeInventoryKey(recipe.meal, recipe.style, recipe.title));
      if (!metadata?.source_url || recipe.source_url) {
        return recipe;
      }

      return {
        ...recipe,
        source_url: metadata.source_url
      };
    });

    inventory.push(...parsed);
  }

  return inventory;
}

function parseJsonLd(html) {
  const scripts = [];
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match = regex.exec(html);

  while (match) {
    scripts.push(match[1]);
    match = regex.exec(html);
  }

  const objects = [];
  for (const scriptText of scripts) {
    try {
      const parsed = JSON.parse(scriptText.trim());
      objects.push(parsed);
    } catch (_error) {
      continue;
    }
  }

  return objects;
}

function flattenJsonLd(node, out = []) {
  if (!node) {
    return out;
  }

  if (Array.isArray(node)) {
    for (const child of node) {
      flattenJsonLd(child, out);
    }
    return out;
  }

  if (typeof node === "object") {
    out.push(node);

    if (Array.isArray(node["@graph"])) {
      flattenJsonLd(node["@graph"], out);
    }
  }

  return out;
}

function normalizeIngredient(value) {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b\d+[\/\d.\s-]*(cups?|cup|tbsp|tsp|teaspoons?|tablespoons?|oz|ounces?|lbs?|pounds?|grams?|kg|ml|l)\b/g, " ")
    .replace(/\b(to taste|divided|optional|for serving|fresh|chopped|minced|diced|sliced)\b/g, " ")
    .replace(/[^a-z\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanForDealsMatch(ingredientStr) {
  return String(ingredientStr || "")
    .toLowerCase()
    .replace(/\d+\/\d+/g, "")
    .replace(/\d+\.?\d*/g, "")
    .replace(
      /\b(cups?|tbsp|tsp|tablespoons?|teaspoons?|oz|lbs?|pounds?|ounces?|grams?|kg|ml|liters?|gallons?|quarts?|pints?|cans?|cloves?|slices?|strips?|sprigs?|bunches?|heads?|stalks?|pieces?|fillets?|packets?|packages?)\b/gi,
      ""
    )
    .replace(
      /\b(boneless|skinless|bone.in|skin.on|fresh|frozen|dried|ground|shredded|grated|sliced|diced|chopped|minced|crushed|peeled|deveined|trimmed|halved|quartered|cubed|beaten|softened|melted|cooked|raw|lean|extra.lean|whole|skim|low.fat|reduced.fat|fat.free|organic|natural|large|medium|small|thin|thick)\b/gi,
      ""
    )
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupe(values) {
  return [...new Set(values.filter(Boolean))];
}

function recipeIngredientsFromHtml(html) {
  const jsonLdNodes = parseJsonLd(html);
  const flat = flattenJsonLd(jsonLdNodes);

  for (const node of flat) {
    const nodeType = node?.["@type"];
    const types = Array.isArray(nodeType) ? nodeType : [nodeType];
    const hasRecipeType = types.some((t) => typeof t === "string" && t.toLowerCase() === "recipe");

    if (!hasRecipeType) {
      continue;
    }

    const ingredients = node.recipeIngredient;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      continue;
    }

    const cleaned = dedupe(
      ingredients
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
    );

    if (cleaned.length) {
      return {
        ingredients: cleaned,
        normalized: dedupe(cleaned.map(normalizeIngredient))
      };
    }
  }

  return null;
}

function decodeDuckDuckGoRedirect(href) {
  if (!href) {
    return null;
  }

  if (href.startsWith("/l/?")) {
    const query = href.split("?")[1] || "";
    const params = new URLSearchParams(query);
    const uddg = params.get("uddg");
    if (uddg) {
      try {
        return decodeURIComponent(uddg);
      } catch (_error) {
        return uddg;
      }
    }
  }

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  return null;
}

function decodeBingRedirect(href) {
  if (!href) {
    return null;
  }

  if (href.startsWith("http://") || href.startsWith("https://")) {
    if (!href.includes("bing.com/ck/a")) {
      return href;
    }

    try {
      const url = new URL(href);
      const encoded = url.searchParams.get("u");
      if (!encoded) {
        return null;
      }

      if (encoded.startsWith("http://") || encoded.startsWith("https://")) {
        return encoded;
      }

      if (encoded.startsWith("a1")) {
        const base64 = decodeURIComponent(encoded.slice(2));
        const decoded = Buffer.from(base64, "base64").toString("utf8");
        if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
          return decoded;
        }
      }
    } catch (_error) {
      return null;
    }
  }

  return null;
}

function isLikelyRecipeUrl(candidate) {
  try {
    const parsed = new URL(candidate);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    const path = parsed.pathname.toLowerCase();

    if (host.includes("bing.com") || host.includes("duckduckgo.com")) {
      return false;
    }

    if (BAD_SEARCH_HOSTS.some((domain) => host.endsWith(domain))) {
      return false;
    }

    if (path.includes("/recipe") || path.includes("/recipes") || path.includes("-recipe")) {
      return true;
    }

    return false;
  } catch (_error) {
    return false;
  }
}

function pickSearchResult(html) {
  const matches = [];
  const anchorRegex = /<a[^>]+class=["'][^"']*result__a[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match = anchorRegex.exec(html);

  while (match) {
    const resolved = decodeDuckDuckGoRedirect(match[1]);
    if (resolved) {
      matches.push(resolved);
    }
    match = anchorRegex.exec(html);
  }

  for (const candidate of matches) {
    try {
      const host = new URL(candidate).hostname.replace(/^www\./, "").toLowerCase();
      const blocked = BAD_SEARCH_HOSTS.some((domain) => host.endsWith(domain));
      if (!blocked) {
        return candidate;
      }
    } catch (_error) {
      continue;
    }
  }

  return null;
}

function pickBingSearchResult(html) {
  const candidates = [];
  const regex = /<h2[^>]*>\s*<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  let match = regex.exec(html);

  while (match) {
    const resolved = decodeBingRedirect(match[1]);
    if (resolved) {
      candidates.push(resolved);
    }
    match = regex.exec(html);
  }

  for (const candidate of candidates) {
    if (isLikelyRecipeUrl(candidate)) {
      return candidate;
    }
  }

  for (const candidate of candidates) {
    try {
      const host = new URL(candidate).hostname.replace(/^www\./, "").toLowerCase();
      if (!BAD_SEARCH_HOSTS.some((domain) => host.endsWith(domain))) {
        return candidate;
      }
    } catch (_error) {
      continue;
    }
  }

  return null;
}

async function findRecipeUrl(recipe) {
  const query = `${recipe.title} recipe ${recipe.meal} ${recipe.style}`;
  const bingParams = new URLSearchParams({ q: query });
  const bingHtml = await requestText(`${BING_SEARCH_URL}?${bingParams.toString()}`);
  if (bingHtml) {
    const bingCandidate = pickBingSearchResult(bingHtml);
    if (bingCandidate) {
      return bingCandidate;
    }
  }

  return null;
}

function inferIngredientsFromTitle(title) {
  const value = title.toLowerCase();
  const inferred = [];
  const excluded = new Set();

  for (const [rule, ingredients] of TITLE_RULES) {
    if (rule.test(value)) {
      inferred.push(...ingredients);
    }
  }

  for (const [rule, ingredients] of TITLE_NEGATION_RULES) {
    if (rule.test(value)) {
      for (const ingredient of ingredients) {
        excluded.add(ingredient);
      }
    }
  }

  if (inferred.length === 0) {
    inferred.push("salt", "pepper", "olive oil");
  }

  return dedupe(inferred).filter((ingredient) => !excluded.has(ingredient));
}

function buildIngredientIndex(recipes) {
  const map = new Map();

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients_normalized) {
      if (!map.has(ingredient)) {
        map.set(ingredient, []);
      }
      map.get(ingredient).push(recipe.id);
    }
  }

  const entries = [...map.entries()]
    .map(([ingredient, recipe_ids]) => ({ ingredient, recipe_ids: dedupe(recipe_ids).sort() }))
    .sort((a, b) => a.ingredient.localeCompare(b.ingredient));

  return {
    generated_at: new Date().toISOString(),
    total_ingredients: entries.length,
    entries
  };
}

function withStableIds(recipes) {
  const seen = new Map();

  return recipes.map((recipe) => {
    const base = slugify(`${recipe.meal}-${recipe.style}-${recipe.title}`);
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);

    return {
      ...recipe,
      id: count === 0 ? base : `${base}-${count + 1}`
    };
  });
}

async function enrichRecipe(recipe) {
  let resolvedUrl = recipe.source_url || null;
  let sourceOrigin = recipe.source_url ? "existing_source" : "none";

  if (!resolvedUrl) {
    resolvedUrl = await findRecipeUrl(recipe);
    if (resolvedUrl) {
      sourceOrigin = "web_search";
    }
    await delay(200);
  }

  if (resolvedUrl) {
    const html = await requestText(resolvedUrl);
    if (html) {
      const parsed = recipeIngredientsFromHtml(html);
      if (parsed && parsed.ingredients.length > 0) {
        return {
          ...recipe,
          source_url: recipe.source_url,
          resolved_source_url: resolvedUrl,
          source_origin: sourceOrigin,
          ingredients: parsed.ingredients,
          ingredients_normalized: parsed.normalized,
          ingredient_source: sourceOrigin === "existing_source" ? "source_scrape" : "searched_scrape",
          confidence: sourceOrigin === "existing_source" ? 0.95 : 0.88
        };
      }
    }
  }

  const inferred = inferIngredientsFromTitle(recipe.title);
  return {
    ...recipe,
    source_url: recipe.source_url,
    resolved_source_url: resolvedUrl,
    source_origin: sourceOrigin,
    ingredients: inferred,
    ingredients_normalized: inferred.map(normalizeIngredient),
    ingredient_source: "title_heuristic",
    confidence: resolvedUrl ? 0.45 : 0.35
  };
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;

  async function runWorker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await worker(items[current], current);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => runWorker());
  await Promise.all(workers);
  return results;
}

function uniqueSortedMonths(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

function intersectMonthArrays(arrays) {
  if (arrays.length === 0) {
    return [];
  }

  const [first, ...rest] = arrays;
  const firstUnique = [...new Set(first)];
  return firstUnique.filter((month) => rest.every((months) => months.includes(month))).sort((a, b) => a - b);
}

function buildSeasonalLookup(produce) {
  return Object.entries(produce).map(([key, value]) => ({
    key: key.toLowerCase(),
    peak: Array.isArray(value?.peak) ? value.peak : [],
    available: Array.isArray(value?.available) ? value.available : [],
    category: value?.category || ""
  }));
}

function resolveLookupKey(seasonalLookup, ...candidates) {
  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase();
    const exact = seasonalLookup.find((entry) => entry.key === normalized);
    if (exact) {
      return exact;
    }
  }

  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase();
    const partial = seasonalLookup.find((entry) => entry.key.includes(normalized));
    if (partial) {
      return partial;
    }
  }

  return null;
}

function matchSeasonalTerms(ingredientList, seasonalLookup) {
  if (!Array.isArray(ingredientList) || ingredientList.length === 0) {
    return [];
  }

  const matchesByKey = new Map();

  for (const rawIngredient of ingredientList) {
    if (typeof rawIngredient !== "string") {
      continue;
    }

    const ingredient = rawIngredient.toLowerCase();
    if (!ingredient.trim()) {
      continue;
    }

    let matchedEntry = null;

    if ((ingredient.includes("green chile") || ingredient.includes("hatch")) && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "green chile", "hatch green chile");
    }

    if (
      ["bell pepper", "hot pepper", "chili pepper", "jalapeño", "jalapeno", "anaheim"].some((term) => ingredient.includes(term)) &&
      !matchedEntry
    ) {
      matchedEntry = resolveLookupKey(seasonalLookup, "peppers");
    }

    if (["cherry tomato", "roma tomato", "grape tomato", "plum tomato"].some((term) => ingredient.includes(term)) && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "tomatoes");
    }

    if (["summer squash", "zucchini"].some((term) => ingredient.includes(term)) && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "zucchini", "summer squash");
    }

    if (["sweet corn", "corn on the cob", "corn kernels"].some((term) => ingredient.includes(term)) && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "corn", "sweet corn");
    }

    if (["green onion", "scallion", "chive"].some((term) => ingredient.includes(term)) && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "onions");
    }

    if (["new potato", "fingerling", "russet", "yukon"].some((term) => ingredient.includes(term)) && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "potatoes");
    }

    if (["butternut", "acorn squash", "delicata", "kabocha"].some((term) => ingredient.includes(term)) && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "winter squash");
    }

    if (ingredient.includes("strawberry") && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "strawberries");
    }

    if (ingredient.includes("raspberry") && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "raspberries");
    }

    if (ingredient.includes("cherry") && !matchedEntry) {
      matchedEntry = resolveLookupKey(seasonalLookup, "cherries");
    }

    if (ingredient.includes("blueberry") && !matchedEntry) {
      continue;
    }

    if (!matchedEntry) {
      matchedEntry = seasonalLookup.find((entry) => ingredient.includes(entry.key));
    }

    if (!matchedEntry || matchesByKey.has(matchedEntry.key)) {
      continue;
    }

    matchesByKey.set(matchedEntry.key, {
      ingredient: matchedEntry.key,
      peak: matchedEntry.peak,
      available: matchedEntry.available,
      matchedTerm: rawIngredient
    });
  }

  return [...matchesByKey.values()];
}

function buildDealsAliasLookup() {
  const aliasLookup = new Map();

  for (const [canonical, aliases] of Object.entries(INGREDIENT_ALIASES)) {
    const cleanedCanonical = cleanForDealsMatch(canonical);
    const cleanedAliases = dedupe((aliases || []).map((alias) => cleanForDealsMatch(alias)).filter(Boolean));

    if (!aliasLookup.has(cleanedCanonical)) {
      aliasLookup.set(cleanedCanonical, new Set());
    }

    for (const cleanedAlias of cleanedAliases) {
      aliasLookup.get(cleanedCanonical).add(cleanedAlias);

      if (!aliasLookup.has(cleanedAlias)) {
        aliasLookup.set(cleanedAlias, new Set());
      }
      aliasLookup.get(cleanedAlias).add(cleanedCanonical);
    }
  }

  return aliasLookup;
}

function isDealsMatch(cleanedIngredient, cleanedDealTerm, aliasTerms) {
  if (!cleanedIngredient || !cleanedDealTerm) {
    return false;
  }

  if (cleanedIngredient.includes(cleanedDealTerm) || cleanedDealTerm.includes(cleanedIngredient)) {
    return true;
  }

  return aliasTerms.some((alias) => alias && cleanedIngredient.includes(alias));
}

async function main() {
  const rawInventory = await loadInventory();
  const inventory = withStableIds(rawInventory).sort((a, b) => {
    return `${a.meal}-${a.style}-${a.title}`.localeCompare(`${b.meal}-${b.style}-${b.title}`);
  });

  const recipes = await mapWithConcurrency(inventory, ENRICH_CONCURRENCY, enrichRecipe);

  const stats = {
    total_recipes: recipes.length,
    with_existing_source: recipes.filter((r) => !!r.source_url).length,
    resolved_from_search: recipes.filter((r) => r.source_origin === "web_search").length,
    scraped_ingredients: recipes.filter((r) => r.ingredient_source !== "title_heuristic").length,
    heuristic_only: recipes.filter((r) => r.ingredient_source === "title_heuristic").length
  };

  const payload = {
    generated_at: new Date().toISOString(),
    stats,
    recipes
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  const indexPayload = buildIngredientIndex(recipes);
  await fs.writeFile(INDEX_PATH, `${JSON.stringify(indexPayload, null, 2)}\n`, "utf8");

  console.log(`Generated ${stats.total_recipes} recipes -> ${path.relative(ROOT_DIR, OUTPUT_PATH)}`);
  console.log(`Ingredient index entries: ${indexPayload.total_ingredients}`);
  console.log(`Source scrape: ${stats.scraped_ingredients}, Heuristic fallback: ${stats.heuristic_only}`);

  // --- SEASONAL MATCH GENERATION ---
  const seasonalData = JSON.parse(await readFile(SEASONAL_DATA_PATH, "utf8"));
  const seasonalProduce = seasonalData?.produce && typeof seasonalData.produce === "object" ? seasonalData.produce : {};
  const seasonalLookup = buildSeasonalLookup(seasonalProduce);

  const seasonalRecipes = recipes.map((recipe) => {
    const ingredientList = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    const seasonalIngredients = matchSeasonalTerms(ingredientList, seasonalLookup);

    const peakArrays = seasonalIngredients.map((entry) => entry.peak || []);
    const peakIntersection = intersectMonthArrays(peakArrays);
    const peakUnion = uniqueSortedMonths(peakArrays.flat());
    const availableMonths = uniqueSortedMonths(seasonalIngredients.flatMap((entry) => entry.available || []));

    return {
      title: recipe.title,
      meal: recipe.meal,
      style: recipe.style,
      source: recipe.source_url || recipe.resolved_source_url || "",
      seasonalIngredients,
      bestMonths: peakIntersection.length > 0 ? peakIntersection : peakUnion,
      availableMonths,
      seasonalScore: seasonalIngredients.length
    };
  });

  seasonalRecipes.sort((a, b) => {
    if (b.seasonalScore !== a.seasonalScore) {
      return b.seasonalScore - a.seasonalScore;
    }
    return a.title.localeCompare(b.title);
  });

  const matchedRecipes = seasonalRecipes.filter((recipe) => recipe.seasonalScore > 0).length;
  const seasonalPayload = {
    generatedAt: new Date().toISOString(),
    region: "colorado",
    regionLabel: "Colorado",
    totalRecipes: seasonalRecipes.length,
    matchedRecipes,
    recipes: seasonalRecipes
  };

  await fs.writeFile(SEASONAL_OUTPUT_PATH, `${JSON.stringify(seasonalPayload, null, 2)}\n`, "utf8");

  const currentMonth = new Date().getMonth() + 1;
  const topThisMonth = seasonalRecipes
    .filter((recipe) => recipe.bestMonths.includes(currentMonth))
    .slice(0, 3);

  console.log("Seasonal match complete.");
  console.log(`${matchedRecipes} of ${seasonalRecipes.length} recipes matched at least one seasonal ingredient.`);
  console.log("Top seasonal recipes this month:");
  for (const recipe of topThisMonth) {
    console.log(`- ${recipe.title} (${recipe.seasonalScore})`);
  }
  console.log(`Output: ${path.relative(ROOT_DIR, SEASONAL_OUTPUT_PATH)}`);

  // --- DEALS CROSS-REFERENCE ---
  try {
    const weeklyDealsPath = path.join(ROOT_DIR, "data", "weekly-deals.json");
    const dealsOutputPath = path.join(ROOT_DIR, "data", "deals-match.json");
    const weeklyDealsData = JSON.parse(await readFile(weeklyDealsPath, "utf8"));
    const weeklyDeals = Array.isArray(weeklyDealsData?.deals) ? weeklyDealsData.deals : [];

    const dealsByTerm = new Map();
    for (const deal of weeklyDeals) {
      const dealTerm = typeof deal?.term === "string" ? deal.term.trim().toLowerCase() : "";
      if (!dealTerm || dealsByTerm.has(dealTerm)) {
        continue;
      }
      dealsByTerm.set(dealTerm, deal);
    }

    const aliasLookup = buildDealsAliasLookup();
    const dealsMatcherEntries = [...dealsByTerm.entries()].map(([dealTerm, deal]) => {
      const cleanedDealTerm = cleanForDealsMatch(dealTerm);
      const aliasTerms = [...(aliasLookup.get(cleanedDealTerm) || new Set())].filter(Boolean);
      return {
        dealTerm,
        cleanedDealTerm,
        aliasTerms,
        deal
      };
    });

    const recipesForMatching = recipes.map((recipe) => ({
      title: recipe.title,
      meal: recipe.meal,
      style: recipe.style,
      source: recipe.source_url || recipe.resolved_source_url || "",
      ingredientsNormalized: Array.isArray(recipe.ingredients_normalized) ? recipe.ingredients_normalized : []
    }));

    const recipesByDealTerm = new Map();
    for (const dealTerm of dealsByTerm.keys()) {
      recipesByDealTerm.set(dealTerm, []);
    }

    const recipeDeals = [];
    let totalRecipeIngredientCount = 0;

    for (const recipe of recipesForMatching) {
      const cleanedIngredientMap = new Map();
      for (const ingredient of recipe.ingredientsNormalized) {
        const cleaned = cleanForDealsMatch(ingredient);
        if (!cleaned || cleanedIngredientMap.has(cleaned)) {
          continue;
        }
        cleanedIngredientMap.set(cleaned, ingredient);
      }

      const cleanedIngredients = [...cleanedIngredientMap.entries()].map(([cleaned, raw]) => ({ raw, cleaned }));

      totalRecipeIngredientCount += cleanedIngredients.length;

      const onSaleIngredients = [];

      for (const entry of dealsMatcherEntries) {
        if (!entry.cleanedDealTerm) {
          continue;
        }

        const matchedIngredient = cleanedIngredients.find((ingredient) =>
          isDealsMatch(ingredient.cleaned, entry.cleanedDealTerm, entry.aliasTerms)
        );

        if (!matchedIngredient) {
          continue;
        }

        recipesByDealTerm.get(entry.dealTerm).push({
          title: recipe.title,
          meal: recipe.meal,
          style: recipe.style,
          source: recipe.source
        });

        onSaleIngredients.push({
          ingredient: matchedIngredient.raw,
          dealName: entry.deal.name,
          promoPrice: entry.deal.promoPrice,
          savings: entry.deal.savings,
          savingsPct: entry.deal.savingsPct,
          size: entry.deal.size || ""
        });
      }

      const totalSavings = Number(onSaleIngredients.reduce((sum, item) => sum + (Number(item.savings) || 0), 0).toFixed(2));
      const dealCount = onSaleIngredients.length;

      if (dealCount === 0) {
        continue;
      }

      recipeDeals.push({
        title: recipe.title,
        meal: recipe.meal,
        style: recipe.style,
        onSaleIngredients,
        totalSavings,
        dealCount
      });
    }

    const dealRecipes = [];
    for (const deal of weeklyDeals) {
      const dealTerm = typeof deal?.term === "string" ? deal.term.trim().toLowerCase() : "";
      const matchedRecipes = (recipesByDealTerm.get(dealTerm) || []).map((recipe) => ({
        title: recipe.title,
        meal: recipe.meal,
        style: recipe.style,
        source: recipe.source || ""
      }));

      if (matchedRecipes.length === 0) {
        continue;
      }

      dealRecipes.push({
        dealTerm: deal.term,
        dealName: deal.name,
        brand: deal.brand || "",
        category: deal.category,
        promoPrice: deal.promoPrice,
        regularPrice: deal.regularPrice,
        savings: deal.savings,
        savingsPct: deal.savingsPct,
        size: deal.size || "",
        imageUrl: deal.imageUrl || "",
        matchedRecipes
      });
    }

    dealRecipes.sort((a, b) => {
      const savingsPctDiff = (Number(b.savingsPct) || 0) - (Number(a.savingsPct) || 0);
      if (savingsPctDiff !== 0) {
        return savingsPctDiff;
      }
      return (a.dealName || "").localeCompare(b.dealName || "");
    });

    recipeDeals.sort((a, b) => {
      if (b.dealCount !== a.dealCount) {
        return b.dealCount - a.dealCount;
      }
      return b.totalSavings - a.totalSavings;
    });

    const matchedDealTerms = [...recipesByDealTerm.values()].filter((matched) => matched.length > 0).length;

    const dealsPayload = {
      generatedAt: new Date().toISOString(),
      weekOf: weeklyDealsData.weekOf,
      locationId: weeklyDealsData.locationId,
      chain: weeklyDealsData.chain,
      totalDeals: weeklyDeals.length,
      dealsWithRecipes: dealRecipes.length,
      totalRecipes: seasonalRecipes.length,
      recipesWithDeals: recipeDeals.length,
      dealRecipes,
      recipeDeals
    };

    await fs.writeFile(dealsOutputPath, `${JSON.stringify(dealsPayload, null, 2)}\n`, "utf8");

    console.log("");
    console.log("===== Deals Cross-Reference Complete =====");
    console.log(`Deals cross-reference: ${matchedDealTerms} deal terms matched against ${totalRecipeIngredientCount} recipe ingredients`);
    console.log(`Recipes with at least 1 deal match: ${recipeDeals.length} of ${recipes.length} total`);
    if (recipeDeals.length > 0) {
      const topRecipe = recipeDeals[0];
      console.log(`Top recipe to cook this week: ${topRecipe.title} - ${topRecipe.dealCount} ingredients on sale`);
    } else {
      console.log("Top recipe to cook this week: No matching recipes found");
    }
    console.log("Output: data/deals-match.json");
    console.log("");
  } catch (_error) {
    console.log("Skipping deals cross-reference: data/weekly-deals.json not found. Run fetch:deals first.");
  }
}

main().catch((error) => {
  console.error("Failed to generate ingredient data.");
  console.error(error);
  process.exit(1);
});
