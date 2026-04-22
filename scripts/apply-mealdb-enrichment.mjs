/**
 * scripts/apply-mealdb-enrichment.mjs
 *
 * Reads data/mealdb-matches.json and applies enrichment to recipe
 * markdown files. For each matched recipe:
 *   - Updates source_url to stable TheMealDB URL
 *   - Optionally replaces ingredient list with TheMealDB data
 *     (only if match score >= threshold)
 *
 * Run from repo root after fetch-mealdb-recipes.mjs:
 *   node ./scripts/apply-mealdb-enrichment.mjs
 *
 * Options:
 *   --min-score=0.7    Minimum match score to apply ingredients (default 0.8)
 *   --urls-only        Only update source URLs, never replace ingredients
 *   --dry-run          Show what would change without writing files
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// ============================================================
// CONFIG
// ============================================================

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const URLS_ONLY = args.includes('--urls-only');
const MIN_SCORE_ARG = args.find(a => a.startsWith('--min-score='));
const MIN_SCORE = MIN_SCORE_ARG
  ? parseFloat(MIN_SCORE_ARG.split('=')[1])
  : 0.8;

console.log(`Mode:       ${DRY_RUN ? 'DRY RUN (no files written)' : 'LIVE'}`);
console.log(`URLs only:  ${URLS_ONLY}`);
console.log(`Min score:  ${MIN_SCORE} (for ingredient replacement)\n`);

// ============================================================
// LOAD MATCHES
// ============================================================

const matchesPath = join(repoRoot, 'data', 'mealdb-matches.json');
if (!existsSync(matchesPath)) {
  console.error('ERROR: data/mealdb-matches.json not found.');
  console.error('Run fetch-mealdb-recipes.mjs first.');
  process.exit(1);
}

const matchData = JSON.parse(readFileSync(matchesPath, 'utf8'));
console.log(`Loaded ${matchData.total_matched} matches from data/mealdb-matches.json`);
console.log(`Generated: ${matchData.generated_at}`);
console.log(`API key type: ${matchData.api_key_type}\n`);

// ============================================================
// PATH RESOLVER
// Maps recipe IDs to markdown file paths
// ============================================================

function idToPath(id) {
  // Convert breakfast-baked-casserole-big-daddy-biscuits
  // to recipes/breakfast/baked-casserole/big-daddy-biscuits.md
  const parts = id.split('-');

  // Find the meal type (breakfast, lunch, dinner)
  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  const mealIdx = parts.findIndex(p => mealTypes.includes(p));
  if (mealIdx === -1) return null;

  const meal = parts[mealIdx];

  // Find the style — everything between meal and the recipe name
  // Styles: baked-casserole, bowls, handheld, meat, rice-or-pasta,
  //         seafood, soup-or-stew, vegetarian
  const styles = [
    'baked-casserole',
    'bowls',
    'handheld',
    'meat',
    'rice-or-pasta',
    'seafood',
    'soup-or-stew',
    'vegetarian'
  ];

  let style = null;
  let styleEndIdx = -1;

  for (const s of styles) {
    const styleWords = s.split('-');
    const afterMeal = parts.slice(mealIdx + 1);
    const joined = afterMeal.join('-');
    if (joined.startsWith(s)) {
      style = s;
      styleEndIdx = mealIdx + 1 + styleWords.length;
      break;
    }
  }

  if (!style) return null;

  // Everything after the style is the filename
  // Strip "suggested-" prefix from filename
  let filenameParts = parts.slice(styleEndIdx);
  if (filenameParts[0] === 'suggested') {
    filenameParts = filenameParts.slice(1);
  }
  const filename = filenameParts.join('-') + '.md';

  return `recipes/${meal}/${style}/${filename}`;
}

// ============================================================
// APPLY ENRICHMENT
// ============================================================

let urlsUpdated = 0;
let ingredientsUpdated = 0;
let skipped = 0;
let notFound = 0;

const report = [];

for (const match of matchData.matches) {
  const filePath = idToPath(match.id);

  if (!filePath) {
    console.log(`  SKIP (could not resolve path): ${match.id}`);
    skipped++;
    continue;
  }

  const fullPath = join(repoRoot, filePath);

  if (!existsSync(fullPath)) {
    console.log(`  NOT FOUND: ${filePath}`);
    notFound++;
    continue;
  }

  let content = readFileSync(fullPath, 'utf8');
  let changed = false;
  const changes = [];

  // --- Update source_url ---
  const sourceUrlMatch = content.match(/^source_url:\s*(.*)$/m);
  const currentUrl = sourceUrlMatch ? sourceUrlMatch[1].trim() : '';

  if (currentUrl !== match.source_url) {
    if (!DRY_RUN) {
      if (currentUrl === '' || currentUrl === 'null') {
        content = content.replace(/^source_url:\s*.*$/m, `source_url: ${match.source_url}`);
      } else {
        content = content.replace(/^source_url:\s*.*$/m, `source_url: ${match.source_url}`);
      }
    }
    changes.push(`URL: ${currentUrl || 'empty'} → ${match.source_url}`);
    urlsUpdated++;
    changed = true;
  }

  // --- Optionally replace ingredients ---
  if (!URLS_ONLY && match.match_score >= MIN_SCORE && match.ingredients.length > 0) {
    const newIngredientLines = match.ingredients.map(i => `- ${i}`).join('\n');
    const newSection = `## Ingredients\n\n${newIngredientLines}\n`;

    const ingredientsSectionRegex = /## Ingredients\n\n[\s\S]*?(?=\n## |\n---|\n$)/;

    if (ingredientsSectionRegex.test(content)) {
      const currentSection = content.match(ingredientsSectionRegex)[0];
      if (currentSection !== newSection.trimEnd()) {
        if (!DRY_RUN) {
          content = content.replace(ingredientsSectionRegex, newSection);
        }
        changes.push(`Ingredients: replaced with ${match.ingredients.length} TheMealDB ingredients`);
        ingredientsUpdated++;
        changed = true;
      }
    }
  }

  // --- Write file ---
  if (changed && !DRY_RUN) {
    writeFileSync(fullPath, content, 'utf8');
  }

  // --- Report ---
  if (changes.length > 0) {
    console.log(`${DRY_RUN ? '[DRY] ' : ''}${filePath}`);
    changes.forEach(c => console.log(`  ${c}`));
    report.push({ id: match.id, path: filePath, score: match.match_score, changes });
  } else {
    console.log(`  OK (no changes needed): ${match.id.split('-').pop()}`);
  }
}

// ============================================================
// SUMMARY
// ============================================================

console.log('\n===== MealDB Enrichment Complete =====');
console.log(`URLs updated:        ${urlsUpdated}`);
console.log(`Ingredients updated: ${ingredientsUpdated}`);
console.log(`Skipped:             ${skipped}`);
console.log(`Not found:           ${notFound}`);

if (DRY_RUN) {
  console.log('\nDRY RUN — no files were written.');
  console.log('Remove --dry-run to apply changes.');
} else if (ingredientsUpdated > 0 || urlsUpdated > 0) {
  console.log('\nNext step: node ./scripts/generate-ingredient-data.mjs');
  console.log('Or commit and let the Regenerate Ingredient Data Action run automatically.');
}
