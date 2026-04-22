/**
 * scripts/fetch-mealdb-recipes.mjs
 *
 * Searches TheMealDB for matches against your 98 recipe collection.
 * Writes matched meal data to data/mealdb-matches.json.
 *
 * Uses the free test key "1" during development.
 * Swap in your paid key via MEALDB_API_KEY env var when it arrives.
 *
 * Run from repo root:
 *   node ./scripts/fetch-mealdb-recipes.mjs
 *
 * With paid key:
 *   MEALDB_API_KEY=your_key node ./scripts/fetch-mealdb-recipes.mjs
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Use paid key if provided, otherwise fall back to free test key
const API_KEY = process.env.MEALDB_API_KEY || '1';
const BASE_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

console.log(`Using API key: ${API_KEY === '1' ? 'free test key (1)' : 'paid key ****'}`);
console.log(`Note: Free key returns limited results. Full database requires paid key.\n`);

// ============================================================
// RECIPE TITLES TO SEARCH
// Stripped of "Suggested - " prefix and normalized for search
// ============================================================

const RECIPE_SEARCHES = [
  // Breakfast
  { id: 'breakfast-baked-casserole-big-daddy-biscuits',                          search: 'biscuits' },
  { id: 'breakfast-baked-casserole-flourless-chickpea-peanut-butter-muffins',    search: 'peanut butter muffins' },
  { id: 'breakfast-baked-casserole-suggested-banana-oat-pancakes',               search: 'banana pancakes' },
  { id: 'breakfast-bowls-suggested-greek-yogurt-parfait',                        search: 'yogurt parfait' },
  { id: 'breakfast-handheld-suggested-breakfast-burritos',                       search: 'breakfast burrito' },
  { id: 'breakfast-meat-greek-pitas-with-chicken',                               search: 'chicken pita' },
  { id: 'breakfast-meat-white-chicken-chili',                                    search: 'white chicken chili' },
  { id: 'breakfast-vegetarian-suggested-avocado-toast-with-egg',                 search: 'avocado toast' },

  // Dinner — baked casserole
  { id: 'dinner-baked-casserole-homemade-pizza',                                 search: 'pizza' },
  { id: 'dinner-baked-casserole-suggested-black-bean-enchiladas',                search: 'enchiladas' },
  { id: 'dinner-baked-casserole-suggested-eggplant-parmesan',                    search: 'eggplant parmesan' },
  { id: 'dinner-baked-casserole-suggested-spanakopita',                          search: 'spanakopita' },

  // Dinner — bowls
  { id: 'dinner-bowls-chipotle-bowls',                                           search: 'burrito bowl' },
  { id: 'dinner-bowls-salmon-veggie-bowls',                                      search: 'salmon bowl' },
  { id: 'dinner-bowls-suggested-chicken-tikka-masala',                           search: 'chicken tikka masala' },
  { id: 'dinner-bowls-suggested-korean-beef-bulgogi-bowls',                      search: 'beef bulgogi' },
  { id: 'dinner-bowls-suggested-thai-green-curry',                               search: 'thai green curry' },
  { id: 'dinner-bowls-suggested-vegetable-curry',                                search: 'vegetable curry' },

  // Dinner — handheld
  { id: 'dinner-handheld-lettuce-wraps',                                         search: 'lettuce wraps' },
  { id: 'dinner-handheld-suggested-fish-tacos-with-cabbage-slaw',                search: 'fish tacos' },
  { id: 'dinner-handheld-suggested-sausage-and-peppers',                         search: 'sausage peppers' },
  { id: 'dinner-handheld-suggested-shrimp-tacos-with-mango-slaw',                search: 'shrimp tacos' },

  // Dinner — meat
  { id: 'dinner-meat-bbq-in-crockpot',                                           search: 'pulled pork' },
  { id: 'dinner-meat-beef-and-broccoli',                                         search: 'beef and broccoli' },
  { id: 'dinner-meat-braised-short-ribs',                                        search: 'short ribs' },
  { id: 'dinner-meat-camper-chicken-enchiladas',                                 search: 'chicken enchiladas' },
  { id: 'dinner-meat-cheeseburgers',                                             search: 'beef burger' },
  { id: 'dinner-meat-chicken-parm',                                              search: 'chicken parmesan' },
  { id: 'dinner-meat-chicken-wings',                                             search: 'chicken wings' },
  { id: 'dinner-meat-chili',                                                     search: 'beef chili' },
  { id: 'dinner-meat-fried-chicken',                                             search: 'fried chicken' },
  { id: 'dinner-meat-grilled-chicken-with-potato-salad',                         search: 'grilled chicken' },
  { id: 'dinner-meat-pork-chops',                                                search: 'pork chops' },
  { id: 'dinner-meat-round-steak-stroganoff',                                    search: 'beef stroganoff' },
  { id: 'dinner-meat-steak-kabobs-deconstructed',                                search: 'beef kabobs' },
  { id: 'dinner-meat-stew',                                                      search: 'beef stew' },
  { id: 'dinner-meat-suggested-butter-chicken',                                  search: 'butter chicken' },
  { id: 'dinner-meat-suggested-caprese-stuffed-chicken',                         search: 'caprese chicken' },
  { id: 'dinner-meat-suggested-japanese-chicken-katsu',                          search: 'chicken katsu' },
  { id: 'dinner-meat-suggested-lamb-kofta-with-tzatziki',                        search: 'lamb kofta' },
  { id: 'dinner-meat-suggested-sheet-pan-chicken-thighs-and-vegetables',         search: 'chicken thighs' },
  { id: 'dinner-meat-tacos',                                                     search: 'beef tacos' },

  // Dinner — rice or pasta
  { id: 'dinner-rice-or-pasta-homemade-mac-n-cheese',                            search: 'mac and cheese' },
  { id: 'dinner-rice-or-pasta-lasagne',                                          search: 'lasagne' },
  { id: 'dinner-rice-or-pasta-meatballs-with-zucchini-and-rice',                 search: 'meatballs' },
  { id: 'dinner-rice-or-pasta-penne-lasagne',                                    search: 'baked penne' },
  { id: 'dinner-rice-or-pasta-salmon-and-rice',                                  search: 'salmon rice' },
  { id: 'dinner-rice-or-pasta-spaghetti',                                        search: 'spaghetti bolognese' },
  { id: 'dinner-rice-or-pasta-suggested-caprese-pasta',                          search: 'caprese pasta' },
  { id: 'dinner-rice-or-pasta-suggested-chicken-pad-thai',                       search: 'pad thai' },
  { id: 'dinner-rice-or-pasta-suggested-dan-dan-noodles',                        search: 'dan dan noodles' },
  { id: 'dinner-rice-or-pasta-suggested-fried-rice-with-egg-and-vegetables',     search: 'fried rice' },
  { id: 'dinner-rice-or-pasta-suggested-garlic-butter-shrimp-with-pasta',        search: 'shrimp pasta' },
  { id: 'dinner-rice-or-pasta-suggested-mushroom-risotto',                       search: 'mushroom risotto' },
  { id: 'dinner-rice-or-pasta-suggested-one-pot-chicken-and-rice',               search: 'chicken rice' },
  { id: 'dinner-rice-or-pasta-suggested-shrimp-fried-rice',                      search: 'shrimp fried rice' },
  { id: 'dinner-rice-or-pasta-tortellini-with-pesto-and-shrimp-and-spinach',     search: 'tortellini' },
  { id: 'dinner-rice-or-pasta-zucchini-and-squash-lasagne',                      search: 'vegetable lasagne' },

  // Dinner — seafood
  { id: 'dinner-seafood-suggested-baked-salmon-with-asparagus',                  search: 'baked salmon' },
  { id: 'dinner-seafood-suggested-mediterranean-baked-cod',                      search: 'baked cod' },

  // Dinner — soup or stew
  { id: 'dinner-soup-or-stew-cheddar-broccoli-soup',                             search: 'broccoli cheese soup' },
  { id: 'dinner-soup-or-stew-chicken-tortilla-soup',                             search: 'chicken tortilla soup' },
  { id: 'dinner-soup-or-stew-chicken-tortilla-soup-in-crock-pot',                search: 'chicken tortilla soup' },
  { id: 'dinner-soup-or-stew-chicken-wild-rice-soup',                            search: 'chicken wild rice soup' },
  { id: 'dinner-soup-or-stew-grilled-cheese-and-tomato-soup',                    search: 'tomato soup' },
  { id: 'dinner-soup-or-stew-suggested-black-bean-soup',                         search: 'black bean soup' },
  { id: 'dinner-soup-or-stew-suggested-butternut-squash-soup',                   search: 'butternut squash soup' },
  { id: 'dinner-soup-or-stew-suggested-clam-chowder',                            search: 'clam chowder' },
  { id: 'dinner-soup-or-stew-suggested-dal-tadka',                               search: 'dal' },
  { id: 'dinner-soup-or-stew-suggested-miso-soup-with-tofu-and-vegetables',      search: 'miso soup' },
  { id: 'dinner-soup-or-stew-suggested-vietnamese-pho',                          search: 'pho' },
  { id: 'dinner-soup-or-stew-wonton-soup',                                       search: 'wonton soup' },

  // Dinner — vegetarian
  { id: 'dinner-vegetarian-stir-fry',                                            search: 'vegetable stir fry' },
  { id: 'dinner-vegetarian-suggested-aloo-gobi',                                 search: 'aloo gobi' },
  { id: 'dinner-vegetarian-suggested-saag-paneer',                               search: 'saag paneer' },
  { id: 'dinner-vegetarian-suggested-shakshuka',                                 search: 'shakshuka' },
  { id: 'dinner-vegetarian-suggested-veggie-stir-fry-with-tofu',                 search: 'tofu stir fry' },

  // Lunch
  { id: 'lunch-bowls-suggested-asian-noodle-salad',                              search: 'noodle salad' },
  { id: 'lunch-bowls-suggested-caprese-salad-with-prosciutto',                   search: 'caprese salad' },
  { id: 'lunch-bowls-suggested-greek-salad-with-chicken',                        search: 'greek salad' },
  { id: 'lunch-handheld-suggested-black-bean-tacos',                             search: 'black bean tacos' },
  { id: 'lunch-handheld-suggested-blt-sandwich',                                 search: 'BLT' },
  { id: 'lunch-handheld-suggested-egg-salad-sandwich',                           search: 'egg salad' },
  { id: 'lunch-handheld-suggested-quesadillas',                                  search: 'quesadilla' },
  { id: 'lunch-handheld-suggested-tuna-salad-sandwich',                          search: 'tuna salad' },
  { id: 'lunch-handheld-suggested-turkey-and-avocado-wrap',                      search: 'turkey wrap' },
  { id: 'lunch-soup-or-stew-suggested-lentil-soup',                              search: 'lentil soup' },
];

// ============================================================
// UTILITY
// ============================================================

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function extractIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      const measure_str = measure && measure.trim() ? `${measure.trim()} ` : '';
      ingredients.push(`${measure_str}${ingredient.trim()}`);
    }
  }
  return ingredients;
}

function scoreMatch(searchTerm, mealName) {
  const search = searchTerm.toLowerCase();
  const meal = mealName.toLowerCase();

  // Exact match
  if (meal === search) return 1.0;

  // Meal name contains search term
  if (meal.includes(search)) return 0.9;

  // Search term contains meal name
  if (search.includes(meal)) return 0.85;

  // Word overlap score
  const searchWords = search.split(' ').filter(w => w.length > 2);
  const mealWords = meal.split(' ').filter(w => w.length > 2);
  const overlap = searchWords.filter(w => mealWords.includes(w)).length;
  const score = overlap / Math.max(searchWords.length, mealWords.length);

  return score;
}

// ============================================================
// MAIN FETCH
// ============================================================

async function searchMeal(searchTerm) {
  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(searchTerm)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`  HTTP ${response.status} for: ${searchTerm}`);
      return null;
    }
    const data = await response.json();
    return data.meals || null;
  } catch (err) {
    console.log(`  Error fetching ${searchTerm}: ${err.message}`);
    return null;
  }
}

const results = {
  generated_at: new Date().toISOString(),
  api_key_type: API_KEY === '1' ? 'free_test' : 'paid',
  total_searched: RECIPE_SEARCHES.length,
  total_matched: 0,
  total_no_match: 0,
  matches: [],
  no_matches: []
};

console.log(`Searching TheMealDB for ${RECIPE_SEARCHES.length} recipes...\n`);

for (const recipe of RECIPE_SEARCHES) {
  process.stdout.write(`Searching: "${recipe.search}"... `);

  const meals = await searchMeal(recipe.search);

  if (!meals || meals.length === 0) {
    console.log('no match');
    results.no_matches.push({ id: recipe.id, search: recipe.search });
    results.total_no_match++;
  } else {
    // Pick the best match by scoring
    let bestMeal = meals[0];
    let bestScore = scoreMatch(recipe.search, meals[0].strMeal);

    for (const meal of meals.slice(1)) {
      const score = scoreMatch(recipe.search, meal.strMeal);
      if (score > bestScore) {
        bestScore = score;
        bestMeal = meal;
      }
    }

    const ingredients = extractIngredients(bestMeal);

    console.log(`matched "${bestMeal.strMeal}" (score: ${bestScore.toFixed(2)}, ${ingredients.length} ingredients)`);

    results.matches.push({
      id: recipe.id,
      search: recipe.search,
      match_score: Math.round(bestScore * 100) / 100,
      mealdb_id: bestMeal.idMeal,
      mealdb_name: bestMeal.strMeal,
      mealdb_category: bestMeal.strCategory,
      mealdb_area: bestMeal.strArea,
      source_url: `https://www.themealdb.com/meal/${bestMeal.idMeal}`,
      mealdb_source_url: bestMeal.strSource || null,
      thumbnail: bestMeal.strMealThumb || null,
      ingredients,
      instructions_preview: bestMeal.strInstructions
        ? bestMeal.strInstructions.substring(0, 200) + '...'
        : null
    });
    results.total_matched++;
  }

  // Polite delay to avoid hammering the API
  await sleep(300);
}

// ============================================================
// OUTPUT
// ============================================================

const outputPath = join(repoRoot, 'data', 'mealdb-matches.json');
writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

console.log('\n===== TheMealDB Search Complete =====');
console.log(`Matched:    ${results.total_matched} of ${results.total_searched} recipes`);
console.log(`No match:   ${results.total_no_match}`);
console.log(`Output:     data/mealdb-matches.json`);
console.log('\nNext step: review data/mealdb-matches.json then run:');
console.log('  node ./scripts/apply-mealdb-enrichment.mjs');
