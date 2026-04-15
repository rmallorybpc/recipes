import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RECIPES_PATH = path.resolve(__dirname, "../data/recipes-with-ingredients.json");
const SEASONAL_PATH = path.resolve(__dirname, "../data/seasonal-colorado.json");
const OUTPUT_PATH = path.resolve(__dirname, "../data/seasonal-match.json");

function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pluralVariants(term) {
  const variants = new Set([term]);

  if (term.endsWith("ies")) {
    variants.add(`${term.slice(0, -3)}y`);
  }
  if (term.endsWith("s")) {
    variants.add(term.slice(0, -1));
  } else {
    variants.add(`${term}s`);
  }

  return [...variants].filter(Boolean);
}

function buildMatchTerms(produceName) {
  const normalizedName = normalize(produceName);
  const terms = new Set(pluralVariants(normalizedName));

  if (normalizedName === "peppers") {
    [
      "pepper",
      "bell pepper",
      "hot pepper",
      "green chile",
      "green chili",
      "jalapeno",
      "serrano"
    ].forEach((v) => terms.add(v));
  }

  if (normalizedName === "sweet corn") {
    ["corn", "sweet corn"].forEach((v) => terms.add(v));
  }

  if (normalizedName === "corn") {
    ["corn", "sweet corn"].forEach((v) => terms.add(v));
  }

  if (normalizedName === "hatch green chile") {
    ["hatch chile", "hatch chili", "hatch green chile", "hatch green chili", "green chile", "green chili"].forEach((v) => terms.add(v));
  }

  if (normalizedName === "scallions") {
    ["green onion", "green onions", "scallion", "scallions"].forEach((v) => terms.add(v));
  }

  if (normalizedName === "green beans") {
    ["green bean", "green beans", "string bean", "string beans"].forEach((v) => terms.add(v));
  }

  if (normalizedName === "Brussels sprouts".toLowerCase()) {
    ["brussels sprout", "brussels sprouts", "brussel sprout", "brussel sprouts"].forEach((v) => terms.add(v));
  }

  return [...terms].filter(Boolean);
}

function intersectsPhrase(haystack, needle) {
  if (!haystack || !needle) {
    return false;
  }

  const escapedNeedle = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const phraseRegex = new RegExp(`(^|\\s)${escapedNeedle}(\\s|$)`);

  return phraseRegex.test(haystack);
}

function intersection(arrays) {
  if (!arrays.length) {
    return [];
  }

  const [first, ...rest] = arrays;
  const result = first.filter((month) => rest.every((arr) => arr.includes(month)));
  return [...new Set(result)].sort((a, b) => a - b);
}

function union(arrays) {
  return [...new Set(arrays.flat())].sort((a, b) => a - b);
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

async function main() {
  const [recipesRaw, seasonalRaw] = await Promise.all([
    readFile(RECIPES_PATH, "utf8"),
    readFile(SEASONAL_PATH, "utf8")
  ]);

  const recipesData = JSON.parse(recipesRaw);
  const seasonalData = JSON.parse(seasonalRaw);

  const produceEntries = Object.entries(seasonalData.produce || {}).map(([name, details]) => ({
    name,
    normalizedName: normalize(name),
    matchTerms: buildMatchTerms(name),
    peak: toArray(details.peak),
    available: toArray(details.available)
  }));

  const output = {
    generatedAt: new Date().toISOString(),
    region: seasonalData.region || "colorado",
    recipes: []
  };

  for (const recipe of recipesData.recipes || []) {
    const ingredientList = (recipe.ingredients_normalized?.length ? recipe.ingredients_normalized : recipe.ingredients) || [];

    const seasonalIngredients = [];
    const seenPairs = new Set();

    for (const ingredient of ingredientList) {
      const ingredientText = String(ingredient ?? "").trim();
      if (!ingredientText) {
        continue;
      }

      const normalizedIngredient = normalize(ingredientText);
      let bestMatch = null;
      let bestLength = -1;

      for (const produce of produceEntries) {
        for (const term of produce.matchTerms) {
          if (intersectsPhrase(normalizedIngredient, term)) {
            if (term.length > bestLength) {
              bestLength = term.length;
              bestMatch = produce;
            }
          }
        }
      }

      if (!bestMatch) {
        continue;
      }

      const dedupeKey = `${bestMatch.name}::${normalizedIngredient}`;
      if (seenPairs.has(dedupeKey)) {
        continue;
      }
      seenPairs.add(dedupeKey);

      seasonalIngredients.push({
        ingredient: bestMatch.name,
        peak: bestMatch.peak,
        available: bestMatch.available,
        matchedTerm: ingredientText
      });
    }

    const bestMonths = intersection(seasonalIngredients.map((item) => item.peak));
    const availableMonths = union(seasonalIngredients.map((item) => item.available));

    output.recipes.push({
      title: recipe.title,
      meal: recipe.meal,
      style: recipe.style,
      seasonalIngredients,
      bestMonths,
      availableMonths,
      seasonalScore: seasonalIngredients.length
    });
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`Wrote ${OUTPUT_PATH} with ${output.recipes.length} recipes.`);
}

main().catch((error) => {
  console.error("Failed to generate seasonal match data:", error);
  process.exitCode = 1;
});
