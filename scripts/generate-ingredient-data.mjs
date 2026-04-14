#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const RECIPES_DIR = path.join(ROOT_DIR, "recipes");
const OUTPUT_PATH = path.join(ROOT_DIR, "data", "recipes-with-ingredients.json");
const INDEX_PATH = path.join(ROOT_DIR, "data", "ingredient-index.json");

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

const BAD_SEARCH_HOSTS = ["pinterest.com", "facebook.com", "instagram.com"];

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

async function loadInventory() {
  const files = await walkKnownRecipeFiles(RECIPES_DIR);
  const inventory = [];

  for (const filePath of files) {
    const relative = path.relative(RECIPES_DIR, filePath).split(path.sep);
    if (relative.length < 3) {
      continue;
    }

    const [meal, style] = relative;
    const markdown = await fs.readFile(filePath, "utf8");
    inventory.push(...parseKnownRecipes(markdown, meal, style));
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

  for (const [rule, ingredients] of TITLE_RULES) {
    if (rule.test(value)) {
      inferred.push(...ingredients);
    }
  }

  if (inferred.length === 0) {
    inferred.push("salt", "pepper", "olive oil");
  }

  return dedupe(inferred);
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
}

main().catch((error) => {
  console.error("Failed to generate ingredient data.");
  console.error(error);
  process.exit(1);
});
