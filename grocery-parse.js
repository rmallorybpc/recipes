// Grocery list helpers: reads ingredient lines and splits each into an amount
// and a name, and remembers ticked items. Loaded after script.js, before grocery.js.

const GROCERY_TICKS_KEY = "weeklyRecipePlanner.groceryTicks.v1";
const GROCERY_PREP_WORDS = /^(finely|roughly|thinly|freshly|chopped|diced|minced|sliced|grated|shredded|beaten|crushed)\s+/i;
const GROCERY_UNITS = "g|kg|mg|ml|l|oz|lb|lbs|pound|pounds|tsp|tbsp|tblsp|tbs|teaspoons?|tablespoons?|cups?|cloves?|cans?|tins?|pinch|pinches|handfuls?|slices?|sprigs?|bunch|bunches|pieces?|sticks?|packets?|large|medium|small";
const GROCERY_QTY = new RegExp(`^((?:\\d+(?:[.,/]\\d+)?|[\\u00bc\\u00bd\\u00be\\u2153\\u2154])(?:[\\u00bc\\u00bd\\u00be])?(?:\\s*[-\\u2013]\\s*\\d+(?:[./]\\d+)?)?(?:\\s+\\d+\\/\\d+)?)\\s*((?:${GROCERY_UNITS})\\b\\.?)?\\s*`, "i");
const grocery = { panel: null, ingredients: null };

function groceryTicks() {
  try {
    return new Set(JSON.parse(localStorage.getItem(GROCERY_TICKS_KEY) || "[]"));
  } catch (_error) {
    return new Set();
  }
}

function saveGroceryTicks(ticks) {
  try {
    localStorage.setItem(GROCERY_TICKS_KEY, JSON.stringify([...ticks]));
  } catch (_error) {
    // Ticks are a convenience. The list still works without them.
  }
}

async function loadGroceryIngredients() {
  if (grocery.ingredients) return grocery.ingredients;
  const map = new Map();
  try {
    const response = await fetch("data/recipes-with-ingredients.json");
    const payload = await response.json();
    (payload.recipes || []).forEach((item) => map.set(item.id, item.ingredients || []));
  } catch (error) {
    console.warn("Grocery ingredients unavailable.", error);
  }
  grocery.ingredients = map;
  return map;
}

function parseGroceryLine(raw) {
  let text = String(raw).replace(/&amp;(?:#8211|ndash);/g, "-").replace(/&amp;(?:#?[a-z0-9]+);/gi, " ");
  text = text.replace(/\([^)]*\)/g, " ").split(",")[0].replace(/\s+/g, " ").trim();
  let amount = "";
  const toTaste = text.match(/^(.*?)\s+to taste$/i);
  const asRequired = text.match(/^as required\s+(.*)$/i);
  if (toTaste) {
    text = toTaste[1];
    amount = "to taste";
  } else if (asRequired) {
    text = asRequired[1];
    amount = "as needed";
  } else {
    const qty = text.match(GROCERY_QTY);
    if (qty && qty[0].trim()) {
      amount = qty[0].trim();
      text = text.slice(qty[0].length);
    }
  }
  while (GROCERY_PREP_WORDS.test(text)) text = text.replace(GROCERY_PREP_WORDS, "");
  text = text.replace(/^of\s+/i, "").trim();
  if (!text) return null;
  const key = text.toLowerCase().replace(/oes$/, "o").replace(/([^s])s$/, "$1");
  return { key, name: text.charAt(0).toUpperCase() + text.slice(1), amount };
}
