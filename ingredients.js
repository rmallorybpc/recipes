const mealFilter = document.querySelector("#ingredientMealFilter");
const styleFilter = document.querySelector("#ingredientStyleFilter");
const ingredientMode = document.querySelector("#ingredientMode");
const ingredientQuery = document.querySelector("#ingredientQuery");
const titleQuery = document.querySelector("#titleQuery");
const recipeGrid = document.querySelector("#ingredientRecipeGrid");
const resultCount = document.querySelector("#ingredientResultCount");
const dataStatus = document.querySelector("#ingredientDataStatus");

let recipes = [];

function pretty(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseIngredientQuery(value) {
  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function matchesIngredient(recipe, queryTokens, mode) {
  if (!queryTokens.length) {
    return true;
  }

  const normalized = Array.isArray(recipe.ingredients_normalized)
    ? recipe.ingredients_normalized.map((item) => item.toLowerCase())
    : [];

  const isTokenMatch = (token) => normalized.some((ingredient) => ingredient.includes(token));

  if (mode === "and") {
    return queryTokens.every(isTokenMatch);
  }

  return queryTokens.some(isTokenMatch);
}

function confidenceLabel(value) {
  const score = Number(value);
  if (Number.isNaN(score)) {
    return "Unknown";
  }

  if (score >= 0.85) {
    return `High (${score.toFixed(2)})`;
  }

  if (score >= 0.6) {
    return `Medium (${score.toFixed(2)})`;
  }

  return `Low (${score.toFixed(2)})`;
}

function renderCards(items) {
  recipeGrid.innerHTML = "";
  resultCount.textContent = `${items.length} recipe${items.length === 1 ? "" : "s"}`;

  if (!items.length) {
    const empty = document.createElement("li");
    empty.className = "card";
    empty.innerHTML = '<p class="recipeName">No recipes match these filters.</p>';
    recipeGrid.appendChild(empty);
    return;
  }

  items.forEach((recipe, index) => {
    const li = document.createElement("li");
    li.className = "card ingredientCard";
    li.style.animationDelay = `${Math.min(index * 20, 300)}ms`;

    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    const sourceLink = recipe.resolved_source_url
      ? `<a class="sourceLink" href="${recipe.resolved_source_url}" target="_blank" rel="noopener noreferrer">Source</a>`
      : "";

    li.innerHTML = `
      <p class="recipeName">${recipe.title}</p>
      <div class="tags">
        <span class="tag">${pretty(recipe.meal)}</span>
        <span class="tag">${pretty(recipe.style)}</span>
        <span class="tag">${recipe.ingredient_source}</span>
        <span class="tag">Confidence: ${confidenceLabel(recipe.confidence)}</span>
      </div>
      <p class="ingredientSummary">Ingredients: ${ingredients.join(", ") || "Unknown"}</p>
      ${sourceLink}
    `;

    recipeGrid.appendChild(li);
  });
}

function applyFilters() {
  const meal = mealFilter.value;
  const style = styleFilter.value;
  const mode = ingredientMode.value;
  const ingredientTokens = parseIngredientQuery(ingredientQuery.value.trim());
  const titleValue = titleQuery.value.trim().toLowerCase();

  const filtered = recipes.filter((recipe) => {
    const matchesMeal = meal === "all" || recipe.meal === meal;
    const matchesStyle = style === "all" || recipe.style === style;
    const matchesIngredients = matchesIngredient(recipe, ingredientTokens, mode);
    const matchesTitle =
      !titleValue ||
      `${recipe.title} ${recipe.meal} ${recipe.style}`.toLowerCase().includes(titleValue);

    return matchesMeal && matchesStyle && matchesIngredients && matchesTitle;
  });

  renderCards(filtered);
}

async function loadData() {
  try {
    const response = await fetch("data/recipes-with-ingredients.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    recipes = Array.isArray(payload.recipes) ? payload.recipes : [];
    dataStatus.textContent = `Dataset generated ${new Date(payload.generated_at).toLocaleString()} | ${recipes.length} recipes`; 
    applyFilters();
  } catch (_error) {
    dataStatus.textContent = "Recipe ingredient dataset is missing. Run scripts/generate-ingredient-data.mjs.";
    renderCards([]);
  }
}

mealFilter.addEventListener("change", applyFilters);
styleFilter.addEventListener("change", applyFilters);
ingredientMode.addEventListener("change", applyFilters);
ingredientQuery.addEventListener("input", applyFilters);
titleQuery.addEventListener("input", applyFilters);

loadData();
