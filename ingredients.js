const mealFilter = document.querySelector("#ingredientMealFilter");
const styleFilter = document.querySelector("#ingredientStyleFilter");
const ingredientMode = document.querySelector("#ingredientMode");
const ingredientQuery = document.querySelector("#ingredientQuery");
const titleQuery = document.querySelector("#titleQuery");
const recipeGrid = document.querySelector("#ingredientRecipeGrid");
const resultCount = document.querySelector("#ingredientResultCount");
const dataStatus = document.querySelector("#ingredientDataStatus");
const INGREDIENT_PREVIEW_COUNT = 4;
const MAX_MATCH_CHIPS = 3;

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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getMatchedIngredients(recipe, queryTokens) {
  if (!queryTokens.length) {
    return [];
  }

  const normalized = Array.isArray(recipe.ingredients_normalized)
    ? recipe.ingredients_normalized.map((item) => item.toLowerCase())
    : [];

  const matches = [];
  queryTokens.forEach((token) => {
    const found = normalized.find((ingredient) => ingredient.includes(token));
    if (found) {
      matches.push(found);
    }
  });

  return [...new Set(matches)];
}

function renderMatchedChips(matched) {
  if (!matched.length) {
    return "";
  }

  const visible = matched.slice(0, MAX_MATCH_CHIPS);
  const hiddenCount = matched.length - visible.length;

  return `
    <div class="matchedRow" aria-label="Matched ingredients">
      <span class="matchedLabel">Matches</span>
      <div class="matchedChips">
        ${visible.map((ingredient) => `<span class="matchedChip">${escapeHtml(ingredient)}</span>`).join("")}
        ${
          hiddenCount > 0
            ? `<span class="matchedChip matchedChipMore">+${hiddenCount} more</span>`
            : ""
        }
      </div>
    </div>
  `;
}

function renderIngredientPreview(ingredients, recipeId, previewCount = INGREDIENT_PREVIEW_COUNT) {
  if (!ingredients.length) {
    return '<p class="ingredientSummary">Ingredients: Unknown</p>';
  }

  const preview = ingredients.slice(0, previewCount);
  const remaining = ingredients.length - preview.length;

  return `
    <div class="ingredientPreview">
      <p class="ingredientPreviewLabel">Ingredients (${ingredients.length})</p>
      <ul class="ingredientList ingredientListCompact">
        ${preview.map((ingredient) => `<li>${escapeHtml(ingredient)}</li>`).join("")}
      </ul>
      ${
        remaining > 0
          ? `<button
              class="expandIngredients"
              type="button"
              aria-expanded="false"
              aria-controls="ingredients-${recipeId}"
              data-recipe-id="${recipeId}"
              data-remaining="${remaining}"
            >Show +${remaining} more</button>`
          : ""
      }
    </div>
  `;
}

function renderFullIngredientList(ingredients, recipeId) {
  if (!ingredients.length) {
    return "";
  }

  return `
    <div id="ingredients-${recipeId}" class="ingredientFull" hidden>
      <ul class="ingredientList ingredientListFull">
        ${ingredients.map((ingredient) => `<li>${escapeHtml(ingredient)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function reliabilityText(source) {
  const value = String(source || "").toLowerCase();
  if (value.includes("scrape") || value === "mealdb_api" || value === "markdown_recipe") {
    return "From source";
  }

  return "Estimated";
}

function reliabilityDetail(source) {
  const value = String(source || "").toLowerCase();
  if (value.includes("scrape")) {
    return "Ingredients were scraped from the linked source recipe.";
  }

  if (value === "mealdb_api") {
    return "Ingredients were pulled directly from TheMealDB for this recipe.";
  }

  if (value === "markdown_recipe") {
    return "Ingredients were loaded from the recipe file in this collection.";
  }

  return "Ingredients are inferred and may be incomplete.";
}

function renderCards(items, queryTokens) {
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

    const recipeId = escapeHtml(recipe.id || `${recipe.meal}-${recipe.style}-${index}`);

    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    const matched = getMatchedIngredients(recipe, queryTokens);
    const matchedChips = renderMatchedChips(matched);
    const ingredientPreview = renderIngredientPreview(ingredients, recipeId);
    const fullIngredientList = renderFullIngredientList(ingredients, recipeId);

    const sourceLink = recipe.source_url && recipe.source_url.trim() !== ""
      ? `<a class="sourceLink" href="${escapeHtml(recipe.source_url)}" target="_blank" rel="noopener noreferrer">Source</a>`
      : "";

    const sourceReliability = reliabilityText(recipe.ingredient_source);
    const sourceDetail = reliabilityDetail(recipe.ingredient_source);
    const sourceInfoClass = sourceReliability === "Estimated"
      ? "sourceInfo sourceInfoEstimated"
      : "sourceInfo";

    li.innerHTML = `
      <p class="recipeName">${escapeHtml(recipe.title)}</p>
      <div class="tags">
        <span class="tag">${escapeHtml(pretty(recipe.meal))}</span>
        <span class="tag">${escapeHtml(pretty(recipe.style))}</span>
        <span class="tag">${escapeHtml(recipe.ingredient_source || "Unknown")}</span>
        <span class="tag">Confidence: ${confidenceLabel(recipe.confidence)}</span>
      </div>
      ${matchedChips}
      ${ingredientPreview}
      ${fullIngredientList}
      <div class="sourceContext">
        ${sourceLink}
        <span class="${sourceInfoClass}" title="${escapeHtml(sourceDetail)}" aria-label="${escapeHtml(sourceDetail)}">${escapeHtml(sourceReliability)}</span>
      </div>
    `;

    recipeGrid.appendChild(li);
  });
}

function handleIngredientToggle(event) {
  const button = event.target.closest(".expandIngredients");
  if (!button) {
    return;
  }

  const recipeId = button.dataset.recipeId;
  const fullList = document.getElementById(`ingredients-${recipeId}`);
  if (!fullList) {
    return;
  }

  const currentlyExpanded = button.getAttribute("aria-expanded") === "true";
  const nextExpanded = !currentlyExpanded;
  const remaining = Number(button.dataset.remaining || "0");

  button.setAttribute("aria-expanded", String(nextExpanded));
  button.textContent = nextExpanded ? "Show less" : `Show +${remaining} more`;
  fullList.hidden = !nextExpanded;
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

  renderCards(filtered, ingredientTokens);
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
    renderCards([], []);
  }
}

mealFilter.addEventListener("change", applyFilters);
styleFilter.addEventListener("change", applyFilters);
ingredientMode.addEventListener("change", applyFilters);
ingredientQuery.addEventListener("input", applyFilters);
titleQuery.addEventListener("input", applyFilters);
recipeGrid.addEventListener("click", handleIngredientToggle);

loadData();
