// Recipe photos: loads data/recipe-images.json and helps cards show them.
// Loaded before script.js. Shares its global scope.

async function loadRecipeImages() {
  try {
    const response = await fetch("data/recipe-images.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    return payload?.images && typeof payload.images === "object" ? payload.images : {};
  } catch (error) {
    console.warn("Recipe images unavailable.", error);
    return {};
  }
}

function attachRecipeImages(imageMap) {
  recipes.forEach((recipe) => {
    const entry = imageMap?.[recipe.id];
    const url = entry?.image;
    if (typeof url === "string" && url.startsWith("https://")) {
      recipe.image = url;
      recipe.mealIngredients = Array.isArray(entry.ingredients) ? entry.ingredients : [];
      recipe.video = typeof entry.video === "string" ? entry.video : null;
    }
  });
}

// TheMealDB serves resized copies at <url>/small, /medium, /large.
function recipeImageUrl(url, size) {
  return /themealdb\.com\/images\/media\/meals\//.test(url) ? `${url}/${size}` : url;
}

// If a resized copy fails, fall back to the original once, then hide.
function handleRecipeImageError(event) {
  const img = event.currentTarget;
  const full = img.dataset.full;
  if (full && img.getAttribute("src") !== full) {
    img.addEventListener("error", () => img.remove(), { once: true });
    img.src = full;
    return;
  }
  img.remove();
}
