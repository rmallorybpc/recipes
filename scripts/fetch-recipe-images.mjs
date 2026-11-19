#!/usr/bin/env node
// Builds data/recipe-images.json: a map of recipe id -> finished-dish photo.
//
// Only recipes whose source_url points at an exact TheMealDB meal
// (https://www.themealdb.com/meal/<id>) get a photo. Fuzzy name matches
// are skipped on purpose, so a photo always shows the actual dish.
//
// Already-known photos are kept, so reruns only look up new recipes.
// Pass --refresh to look everything up again.
//
// Usage: MEALDB_API_KEY=... node ./scripts/fetch-recipe-images.mjs [--refresh]

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DATASET = path.join(ROOT, "data", "recipes-with-ingredients.json");
const OUTPUT = path.join(ROOT, "data", "recipe-images.json");
const API_KEY = process.env.MEALDB_API_KEY || "1";
const REFRESH = process.argv.includes("--refresh");
const DELAY_MS = 120;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function lookupThumb(mealId) {
  const url = `https://www.themealdb.com/api/json/v1/${API_KEY}/lookup.php?i=${mealId}`;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.status === 429) {
        await sleep(2000 * attempt);
        continue;
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const thumb = payload?.meals?.[0]?.strMealThumb;
      return typeof thumb === "string" && thumb.startsWith("https://") ? thumb : null;
    } catch (error) {
      if (attempt === 3) {
        console.warn(`  lookup failed for ${mealId}: ${error.message}`);
        return null;
      }
      await sleep(1000 * attempt);
    }
  }
  return null;
}

async function main() {
  const dataset = await readJson(DATASET, null);
  if (!Array.isArray(dataset?.recipes)) {
    throw new Error(`Could not read recipes from ${DATASET}`);
  }

  const existing = REFRESH ? {} : (await readJson(OUTPUT, {}))?.images || {};
  const images = {};
  let looked = 0;
  let found = 0;
  let reused = 0;
  let skipped = 0;

  for (const recipe of dataset.recipes) {
    const match = String(recipe.source_url || "").match(/themealdb\.com\/meal\/(\d+)/);
    if (!recipe.id || !match) {
      skipped += 1;
      continue;
    }

    const mealId = match[1];
    const known = existing[recipe.id];
    if (known && known.mealdb_id === mealId) {
      images[recipe.id] = known;
      reused += 1;
      continue;
    }

    looked += 1;
    const thumb = await lookupThumb(mealId);
    if (thumb) {
      images[recipe.id] = { image: thumb, mealdb_id: mealId, source: "themealdb" };
      found += 1;
    }
    await sleep(DELAY_MS);
  }

  const output = {
    generated_at: new Date().toISOString(),
    stats: {
      total_recipes: dataset.recipes.length,
      with_image: Object.keys(images).length,
      looked_up: looked,
      found_new: found,
      reused,
      no_mealdb_id: skipped
    },
    images
  };

  await fs.writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify(output.stats, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
