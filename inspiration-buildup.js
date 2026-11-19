// Ingredient build-up: before each carousel photo, the dish's ingredient
// photos pop in one at a time, then fade away as the finished dish appears.
// Loaded after inspiration.js. Skipped for reduced motion or no ingredients.

const BUILD_SKIP = new Set(["salt", "water"]);
const BUILD_MAX = 9;
const buildCalm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let buildToken = 0;

function ingredientImageUrl(name) {
  return `https://www.themealdb.com/images/ingredients/${name.toLowerCase().replace(/ /g, "_")}.png`;
}

function buildIngredients(recipe) {
  const list = Array.isArray(recipe.mealIngredients) ? recipe.mealIngredients : [];
  return list.filter((name) => !BUILD_SKIP.has(name.toLowerCase())).slice(0, BUILD_MAX);
}

function playBuildUp(recipe, slide) {
  buildToken += 1;
  const token = buildToken;
  let grid = slide.querySelector(".inspoBuild");
  if (!grid) {
    grid = document.createElement("div");
    grid.className = "inspoBuild";
    grid.setAttribute("aria-hidden", "true");
    slide.prepend(grid);
  }

  slide.classList.remove("is-building");
  const names = buildIngredients(recipe);
  if (buildCalm || !names.length) {
    grid.innerHTML = "";
    return;
  }

  grid.innerHTML = "";
  const chips = names.map((name) => {
    const chip = document.createElement("div");
    chip.className = "inspoChip";
    const img = document.createElement("img");
    img.alt = "";
    img.decoding = "async";
    img.addEventListener("error", () => chip.remove(), { once: true });
    img.src = ingredientImageUrl(name);
    const label = document.createElement("span");
    label.textContent = name;
    chip.append(img, label);
    grid.appendChild(chip);
    return chip;
  });

  slide.classList.add("is-building");
  chips.forEach((chip, i) => {
    setTimeout(() => {
      if (token === buildToken) chip.classList.add("on");
    }, 150 + i * 140);
  });
  setTimeout(() => {
    if (token === buildToken) slide.classList.remove("is-building");
  }, 150 + chips.length * 140 + 600);
}

function preloadBuildUp(recipe) {
  if (!recipe || buildCalm) return;
  buildIngredients(recipe).forEach((name) => {
    const img = new Image();
    img.src = ingredientImageUrl(name);
  });
}
