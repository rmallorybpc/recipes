#!/usr/bin/env node

import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT_DIR, "data");
const RECIPES_DIR = path.join(ROOT_DIR, "recipes");
const IMPORT_STATE_PATH = path.join(DATA_DIR, "mealdb-imported-ids.json");
const REPORT_PATH = path.join(DATA_DIR, "mealdb-import-report.json");
const RAW_SNAPSHOT_PATH = path.join(DATA_DIR, "mealdb-catalog-raw.json");
const SCRIPT_JS_PATH = path.join(ROOT_DIR, "script.js");

const VALID_STYLES = new Set([
  "meat",
  "rice-or-pasta",
  "soup-or-stew",
  "handheld",
  "baked-casserole",
  "bowls",
  "vegetarian",
  "seafood"
]);

const CATEGORY_STYLE_MAP = {
  beef: "meat",
  chicken: "meat",
  lamb: "meat",
  pork: "meat",
  goat: "meat",
  seafood: "seafood",
  pasta: "rice-or-pasta",
  starter: "handheld",
  side: "bowls",
  vegetarian: "vegetarian",
  vegan: "vegetarian",
  breakfast: "baked-casserole",
  dessert: "baked-casserole",
  miscellaneous: "bowls"
};

function usage() {
  console.log(`Import all MealDB meals into repo files in an additive, idempotent way.

Usage:
  node ./scripts/import-mealdb-catalog.mjs [options]

Options:
  --api-key <key>            MealDB API key (or use MEALDB_API_KEY env var)
  --dry-run                  Preview actions without writing files
  --limit <n>                Limit hydrated MealDB meals for test runs
  --delay-ms <n>             Delay between lookup calls (default: 120)
  --write-import-log         Write raw snapshot to data/mealdb-catalog-raw.json
  --strict-category-map      Fail when MealDB category has no explicit style map
  -h, --help                 Show this help

Notes:
  - Imported meals are mapped to meal=dinner by default.
  - Display name prefix is "MealDB - " for known-recipes and script.js entries.
  - Run node ./scripts/generate-ingredient-data.mjs after a live import.
`);
}

function parseInteger(value, flagName) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`Invalid numeric value for ${flagName}: ${value}`);
  }
  return parsed;
}

function parseArgs(argv) {
  const args = {
    apiKey: process.env.MEALDB_API_KEY || "",
    dryRun: false,
    limit: Infinity,
    delayMs: 120,
    writeImportLog: false,
    strictCategoryMap: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "--dry-run") {
      args.dryRun = true;
      continue;
    }

    if (token === "--write-import-log") {
      args.writeImportLog = true;
      continue;
    }

    if (token === "--strict-category-map") {
      args.strictCategoryMap = true;
      continue;
    }

    if (token === "--api-key") {
      args.apiKey = argv[i + 1] || "";
      i += 1;
      continue;
    }

    if (token.startsWith("--api-key=")) {
      args.apiKey = token.slice("--api-key=".length);
      continue;
    }

    if (token === "--limit") {
      args.limit = parseInteger(argv[i + 1], "--limit");
      i += 1;
      continue;
    }

    if (token.startsWith("--limit=")) {
      args.limit = parseInteger(token.slice("--limit=".length), "--limit");
      continue;
    }

    if (token === "--delay-ms") {
      args.delayMs = parseInteger(argv[i + 1], "--delay-ms");
      i += 1;
      continue;
    }

    if (token.startsWith("--delay-ms=")) {
      args.delayMs = parseInteger(token.slice("--delay-ms=".length), "--delay-ms");
      continue;
    }

    if (token === "-h" || token === "--help") {
      usage();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${token}`);
  }

  if (!args.apiKey.trim()) {
    throw new Error("MealDB API key is required. Use --api-key or MEALDB_API_KEY env var.");
  }

  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, retries = 3) {
  let attempt = 0;
  let lastError = null;

  while (attempt < retries) {
    attempt += 1;
    try {
      const response = await fetch(url, {
        headers: {
          accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await sleep(attempt * 250);
      }
    }
  }

  throw new Error(`Failed after ${retries} attempts: ${url}; ${lastError ? lastError.message : "unknown error"}`);
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);
}

function escapeDoubleQuoted(value) {
  return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function toYamlString(value) {
  return `"${escapeDoubleQuoted(value)}"`;
}

function toYamlKeywords(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return "[]";
  }
  return `[${values.map((item) => JSON.stringify(item)).join(", ")}]`;
}

function normalizeList(value) {
  return Array.from(
    new Set(
      String(value || "")
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
    )
  );
}

function inferStyleFromMeal(meal, strictCategoryMap) {
  const category = String(meal.strCategory || "").trim().toLowerCase();
  const name = String(meal.strMeal || "").trim().toLowerCase();
  const tags = normalizeList(meal.strTags).join(" ").toLowerCase();
  const context = `${name} ${tags}`;

  if (CATEGORY_STYLE_MAP[category]) {
    return CATEGORY_STYLE_MAP[category];
  }

  if (strictCategoryMap) {
    throw new Error(`No style mapping configured for MealDB category: ${meal.strCategory || "(empty)"}`);
  }

  if (/soup|stew|chowder|bisque|pho|ramen broth/.test(context)) {
    return "soup-or-stew";
  }

  if (/taco|sandwich|burger|pita|wrap|roll|quesadilla|kebab|shawarma|gyro/.test(context)) {
    return "handheld";
  }

  if (/pasta|noodle|rice|risotto|spaghetti|lasagn|mac\s*and\s*cheese|paella|pilaf/.test(context)) {
    return "rice-or-pasta";
  }

  if (/salad|bowl|grain bowl/.test(context)) {
    return "bowls";
  }

  if (/casserole|bake|baked|pie|tart|grat|pizza|moussaka/.test(context)) {
    return "baked-casserole";
  }

  if (/fish|salmon|shrimp|prawn|cod|tuna|seafood|clam|mussel|sardine|anchovy/.test(context)) {
    return "seafood";
  }

  if (/vegetarian|vegan|tofu|lentil|chickpea|bean/.test(context)) {
    return "vegetarian";
  }

  return "meat";
}

function inferProtein(meal) {
  const ingredients = extractIngredients(meal).join(" ").toLowerCase();
  const title = String(meal.strMeal || "").toLowerCase();
  const category = String(meal.strCategory || "").toLowerCase();
  const context = `${ingredients} ${title} ${category}`;

  if (/shrimp|prawn|salmon|cod|tuna|fish|clam|mussel|crab|lobster|sardine|anchovy/.test(context)) {
    return "seafood";
  }
  if (/chicken/.test(context)) {
    return "chicken";
  }
  if (/beef|steak|veal/.test(context)) {
    return "beef";
  }
  if (/pork|bacon|ham|sausage/.test(context)) {
    return "pork";
  }
  if (/turkey/.test(context)) {
    return "turkey";
  }
  if (/tofu/.test(context)) {
    return "tofu";
  }

  return "none";
}

function extractIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = String(meal[`strIngredient${i}`] || "").trim();
    const measure = String(meal[`strMeasure${i}`] || "").trim();
    if (!ingredient) {
      continue;
    }

    ingredients.push(`${measure ? `${measure} ` : ""}${ingredient}`.trim());
  }
  return ingredients;
}

function splitInstructions(instructions) {
  const normalized = String(instructions || "").replace(/\r/g, "\n");
  const chunks = normalized
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const steps = [];
  for (const chunk of chunks) {
    const parts = chunk.split(/\.\s+(?=[A-Z0-9])/).map((part) => part.trim()).filter(Boolean);
    for (const part of parts) {
      const cleaned = part.replace(/^\d+[.)]\s*/, "").trim();
      if (cleaned) {
        steps.push(cleaned.endsWith(".") ? cleaned : `${cleaned}.`);
      }
    }
  }

  if (steps.length === 0) {
    return ["Follow source instructions from TheMealDB."];
  }

  return Array.from(new Set(steps));
}

function buildKeywords(meal) {
  const rawTags = normalizeList(meal.strTags);
  const category = String(meal.strCategory || "").trim();
  const area = String(meal.strArea || "").trim();
  const keywords = [...rawTags, category, area]
    .map((item) => item.toLowerCase().replace(/\s+/g, "-"))
    .filter(Boolean);

  return Array.from(new Set(keywords)).slice(0, 10);
}

function buildRecipeMarkdown(payload) {
  const lines = [
    "---",
    `title: ${toYamlString(payload.title)}`,
    `meal: ${payload.meal}`,
    `style: ${payload.style}`,
    `protein: ${payload.protein}`,
    `cuisine: ${toYamlString(payload.cuisine)}`,
    `time_minutes: ${payload.timeMinutes}`,
    `servings: ${payload.servings}`,
    `source_url: ${payload.sourceUrl}`,
    `keywords: ${toYamlKeywords(payload.keywords)}`,
    "---",
    "",
    "# Summary",
    "",
    payload.summary,
    "",
    "## Ingredients",
    "",
    ...payload.ingredients.map((item) => `- ${item}`),
    "",
    "## Instructions",
    "",
    ...payload.instructions.map((step, index) => `${index + 1}. ${step}`),
    "",
    "## Notes",
    "",
    `- Imported from TheMealDB (id: ${payload.idMeal}).`,
    `- Original category: ${payload.category || "Unknown"}.`,
    `- Original area: ${payload.area || "Unknown"}.`
  ];

  if (payload.youtubeUrl) {
    lines.push(`- Video: ${payload.youtubeUrl}`);
  }

  lines.push("");
  return lines.join("\n");
}

async function readJsonFile(filePath, fallbackValue) {
  try {
    const text = await fs.readFile(filePath, "utf8");
    return JSON.parse(text);
  } catch (_error) {
    return fallbackValue;
  }
}

function appendKnownRows(existingContent, titles) {
  const existing = new Set(
    existingContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2).trim())
  );

  let added = 0;
  const additions = [];
  for (const title of titles) {
    if (!existing.has(title)) {
      additions.push(`- ${title}`);
      existing.add(title);
      added += 1;
    }
  }

  if (additions.length === 0) {
    return {
      content: existingContent.endsWith("\n") ? existingContent : `${existingContent}\n`,
      added
    };
  }

  const base = existingContent.trimEnd();
  return {
    content: `${base}\n\n${additions.join("\n")}\n`,
    added
  };
}

function prettyStyle(style) {
  return style
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function ensureKnownRecipesFile(meal, style) {
  const knownPath = path.join(ROOT_DIR, "recipes", meal, style, "known-recipes.md");
  try {
    const content = await fs.readFile(knownPath, "utf8");
    return { knownPath, content };
  } catch (_error) {
    const heading = `# ${meal[0].toUpperCase()}${meal.slice(1)} ${prettyStyle(style)} Recipes\n\n`;
    return { knownPath, content: heading };
  }
}

function parseExistingScriptRecipeNames(sourceBlock) {
  const names = new Set();
  const regex = /name:\s*"((?:[^"\\]|\\.)*)"/g;

  let match = regex.exec(sourceBlock);
  while (match) {
    const raw = match[1];
    const unescaped = raw.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    names.add(unescaped);
    match = regex.exec(sourceBlock);
  }

  return names;
}

function buildScriptEntry(displayName, meal, style) {
  return `  { name: ${JSON.stringify(displayName)}, meal: ${JSON.stringify(meal)}, style: ${JSON.stringify(style)} },`;
}

async function updateScriptRecipesArray(entries, dryRun) {
  const source = await fs.readFile(SCRIPT_JS_PATH, "utf8");
  const start = source.indexOf("const RECIPES = [");
  const endAnchor = "\n];\n\nlet recipes = [...RECIPES];";
  const end = source.indexOf(endAnchor);

  if (start === -1 || end === -1) {
    throw new Error("Could not locate RECIPES array in script.js");
  }

  const block = source.slice(start, end);
  const existingNames = parseExistingScriptRecipeNames(block);

  const uniqueEntries = [];
  const seenNames = new Set();
  for (const entry of entries) {
    if (!entry || !entry.name || seenNames.has(entry.name)) {
      continue;
    }
    seenNames.add(entry.name);
    uniqueEntries.push(entry);
  }

  const toAdd = uniqueEntries.filter((entry) => !existingNames.has(entry.name));
  if (toAdd.length === 0) {
    return { added: 0 };
  }

  const newLines = toAdd.map((entry) => buildScriptEntry(entry.name, entry.meal, entry.style)).join("\n");
  const needsComma = !block.trimEnd().endsWith(",");
  const separator = needsComma ? ",\n" : "\n";
  const updatedBlock = `${block}${separator}${newLines}`;

  if (!dryRun) {
    const updatedSource = `${source.slice(0, start)}${updatedBlock}${source.slice(end)}`;
    await fs.writeFile(SCRIPT_JS_PATH, updatedSource, "utf8");
  }

  return { added: toAdd.length };
}

async function walkMarkdownFiles(dirPath) {
  const result = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await walkMarkdownFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!entry.name.endsWith(".md")) {
      continue;
    }

    if (entry.name === "known-recipes.md" || entry.name === "README.md" || entry.name === "recipe-template.md") {
      continue;
    }

    result.push(fullPath);
  }

  return result;
}

async function getImportedIdsFromExistingMarkdown() {
  const files = await walkMarkdownFiles(RECIPES_DIR);
  const ids = new Set();

  for (const file of files) {
    let content = "";
    try {
      content = await fs.readFile(file, "utf8");
    } catch (_error) {
      continue;
    }

    const match = content.match(/^source_url:\s*https?:\/\/www\.themealdb\.com\/meal\/(\d+)\/?\s*$/m);
    if (match) {
      ids.add(match[1]);
    }
  }

  return ids;
}

async function fetchMealCatalog(apiKey, delayMs, limit) {
  const baseUrl = `https://www.themealdb.com/api/json/v2/${apiKey}`;

  const categoriesPayload = await fetchJson(`${baseUrl}/categories.php`);
  const categories = Array.isArray(categoriesPayload?.categories) ? categoriesPayload.categories : [];
  if (categories.length === 0) {
    throw new Error("TheMealDB categories response was empty.");
  }

  const idToCategories = new Map();

  for (const categoryRecord of categories) {
    const categoryName = String(categoryRecord?.strCategory || "").trim();
    if (!categoryName) {
      continue;
    }

    const filterPayload = await fetchJson(`${baseUrl}/filter.php?c=${encodeURIComponent(categoryName)}`);
    const meals = Array.isArray(filterPayload?.meals) ? filterPayload.meals : [];

    for (const meal of meals) {
      const idMeal = String(meal?.idMeal || "").trim();
      if (!idMeal) {
        continue;
      }

      if (!idToCategories.has(idMeal)) {
        idToCategories.set(idMeal, new Set());
      }
      idToCategories.get(idMeal).add(categoryName);
    }
  }

  const ids = Array.from(idToCategories.keys());
  const cappedIds = Number.isFinite(limit) ? ids.slice(0, limit) : ids;

  const meals = [];
  const failures = [];

  for (let i = 0; i < cappedIds.length; i += 1) {
    const idMeal = cappedIds[i];
    try {
      const payload = await fetchJson(`${baseUrl}/lookup.php?i=${encodeURIComponent(idMeal)}`);
      const meal = Array.isArray(payload?.meals) && payload.meals.length > 0 ? payload.meals[0] : null;
      if (!meal) {
        failures.push({ idMeal, reason: "lookup returned no meal" });
      } else {
        meals.push({
          ...meal,
          _categories: Array.from(idToCategories.get(idMeal) || []),
          _primaryCategory: Array.from(idToCategories.get(idMeal) || [meal.strCategory || ""])[0] || meal.strCategory || ""
        });
      }
    } catch (error) {
      failures.push({ idMeal, reason: error.message || String(error) });
    }

    if (delayMs > 0) {
      await sleep(delayMs);
    }

    if ((i + 1) % 100 === 0 || i + 1 === cappedIds.length) {
      console.log(`Hydrated ${i + 1}/${cappedIds.length} MealDB meals...`);
    }
  }

  return {
    categoriesCount: categories.length,
    totalUniqueIds: ids.length,
    hydratedCount: meals.length,
    failures,
    meals
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log("===== MealDB Catalog Import =====");
  console.log(`Mode:               ${args.dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`Meal mapping:       dinner (default)`);
  console.log(`Name prefix:        MealDB -`);
  console.log(`Limit:              ${Number.isFinite(args.limit) ? args.limit : "none"}`);
  console.log(`Lookup delay (ms):  ${args.delayMs}`);
  console.log(`Strict cat map:     ${args.strictCategoryMap}`);
  console.log("");

  const importState = await readJsonFile(IMPORT_STATE_PATH, { imported_ids: [] });
  const idsFromState = new Set(Array.isArray(importState.imported_ids) ? importState.imported_ids.map((v) => String(v)) : []);
  const idsFromMarkdown = await getImportedIdsFromExistingMarkdown();
  const knownMealDbIds = new Set([...idsFromState, ...idsFromMarkdown]);

  console.log(`Known MealDB ids from state+markdown: ${knownMealDbIds.size}`);

  const catalog = await fetchMealCatalog(args.apiKey, args.delayMs, args.limit);
  console.log(`Fetched ${catalog.hydratedCount} full meals from ${catalog.totalUniqueIds} unique MealDB ids.`);

  if (args.writeImportLog && !args.dryRun) {
    await fs.writeFile(RAW_SNAPSHOT_PATH, JSON.stringify({ generated_at: new Date().toISOString(), catalog }, null, 2), "utf8");
    console.log("Wrote raw catalog snapshot to data/mealdb-catalog-raw.json");
  }

  const knownTitlesByStyle = new Map();
  const scriptEntries = [];
  const newIds = new Set();

  let createdMarkdown = 0;
  let skippedKnownId = 0;
  let skippedExistingFile = 0;
  let failedWrites = 0;

  for (const meal of catalog.meals) {
    const idMeal = String(meal.idMeal || "").trim();
    const title = String(meal.strMeal || "").trim();
    if (!idMeal || !title) {
      continue;
    }

    let style = inferStyleFromMeal(meal, args.strictCategoryMap);
    if (!VALID_STYLES.has(style)) {
      style = "meat";
    }

    const mealSlot = "dinner";
    const displayName = `MealDB - ${title}`;
    const slug = `${slugify(title)}-${idMeal}`;
    const relPath = path.join("recipes", mealSlot, style, `${slug}.md`);
    const absPath = path.join(ROOT_DIR, relPath);
    const fileExists = existsSync(absPath);

    if (fileExists) {
      skippedExistingFile += 1;
    }

    if (knownMealDbIds.has(idMeal)) {
      skippedKnownId += 1;
    }

    if (!fileExists && !knownMealDbIds.has(idMeal)) {
      const ingredients = extractIngredients(meal);
      const instructions = splitInstructions(meal.strInstructions);
      const sourceUrl = `https://www.themealdb.com/meal/${idMeal}`;

      const markdown = buildRecipeMarkdown({
        idMeal,
        title,
        meal: mealSlot,
        style,
        protein: inferProtein(meal),
        cuisine: String(meal.strArea || "").trim(),
        timeMinutes: 30,
        servings: 4,
        sourceUrl,
        keywords: buildKeywords(meal),
        summary: `${title} from TheMealDB imported into the planner collection.`,
        ingredients,
        instructions,
        category: String(meal._primaryCategory || meal.strCategory || "").trim(),
        area: String(meal.strArea || "").trim(),
        youtubeUrl: String(meal.strYoutube || "").trim()
      });

      try {
        if (!args.dryRun) {
          await fs.mkdir(path.dirname(absPath), { recursive: true });
          await fs.writeFile(absPath, markdown, "utf8");
        }
        createdMarkdown += 1;
        newIds.add(idMeal);
      } catch (error) {
        failedWrites += 1;
        console.log(`Failed write for ${idMeal} (${title}): ${error.message || error}`);
        continue;
      }
    }

    if (!knownTitlesByStyle.has(style)) {
      knownTitlesByStyle.set(style, new Set());
    }
    knownTitlesByStyle.get(style).add(displayName);

    scriptEntries.push({
      name: displayName,
      meal: mealSlot,
      style
    });
  }

  let knownRecipesAdded = 0;
  for (const [style, titleSet] of knownTitlesByStyle.entries()) {
    const { knownPath, content } = await ensureKnownRecipesFile("dinner", style);
    const titles = Array.from(titleSet).sort((a, b) => a.localeCompare(b));
    const { content: updatedContent, added } = appendKnownRows(content, titles);

    if (added > 0 && !args.dryRun) {
      await fs.mkdir(path.dirname(knownPath), { recursive: true });
      await fs.writeFile(knownPath, updatedContent, "utf8");
    }

    knownRecipesAdded += added;
  }

  const scriptUpdate = await updateScriptRecipesArray(scriptEntries, args.dryRun);

  const mergedIds = Array.from(new Set([...knownMealDbIds, ...newIds])).sort((a, b) => Number(a) - Number(b));

  if (!args.dryRun) {
    await fs.writeFile(
      IMPORT_STATE_PATH,
      JSON.stringify(
        {
          generated_at: new Date().toISOString(),
          imported_ids: mergedIds
        },
        null,
        2
      ),
      "utf8"
    );
  }

  const report = {
    generated_at: new Date().toISOString(),
    mode: args.dryRun ? "dry-run" : "live",
    input: {
      hydrated_count: catalog.hydratedCount,
      unique_ids: catalog.totalUniqueIds,
      categories_count: catalog.categoriesCount,
      lookup_failures: catalog.failures.length
    },
    output: {
      markdown_created: createdMarkdown,
      skipped_known_id: skippedKnownId,
      skipped_existing_file: skippedExistingFile,
      known_recipes_added: knownRecipesAdded,
      script_entries_added: scriptUpdate.added,
      write_failures: failedWrites,
      import_state_ids: mergedIds.length
    },
    failures: catalog.failures
  };

  if (!args.dryRun) {
    await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  }

  console.log("\n===== Import Summary =====");
  console.log(`Hydrated meals:           ${catalog.hydratedCount}`);
  console.log(`Lookup failures:          ${catalog.failures.length}`);
  console.log(`Markdown created:         ${createdMarkdown}`);
  console.log(`Skipped (known id):       ${skippedKnownId}`);
  console.log(`Skipped (existing file):  ${skippedExistingFile}`);
  console.log(`Known-recipes added:      ${knownRecipesAdded}`);
  console.log(`script.js entries added:  ${scriptUpdate.added}`);
  console.log(`Write failures:           ${failedWrites}`);
  console.log(`State ids total:          ${mergedIds.length}`);

  if (args.dryRun) {
    console.log("\nDRY RUN: no files were written.");
    console.log("Run again without --dry-run to apply changes.");
  } else {
    console.log("\nWrote state: data/mealdb-imported-ids.json");
    console.log("Wrote report: data/mealdb-import-report.json");
    console.log("Next: node ./scripts/generate-ingredient-data.mjs");
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
