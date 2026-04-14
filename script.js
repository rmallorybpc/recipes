const RECIPES = [
  { name: "Tacos", meal: "dinner", style: "meat" },
  { name: "Skillet meatloaf / cheeseburger meatloaf", meal: "dinner", style: "meat" },
  { name: "Cheeseburgers", meal: "dinner", style: "meat" },
  { name: "Round steak stroganoff", meal: "dinner", style: "meat" },
  { name: "Pork chops", meal: "dinner", style: "meat" },
  { name: "Chicken parm", meal: "dinner", style: "meat" },
  { name: "Grilled chicken with potato salad", meal: "dinner", style: "meat" },
  { name: "Fried chicken", meal: "dinner", style: "meat" },
  { name: "Camper chicken enchiladas", meal: "dinner", style: "meat" },
  { name: "Chicken wings", meal: "dinner", style: "meat" },
  { name: "Steak kabobs deconstructed", meal: "dinner", style: "meat" },
  { name: "Chili", meal: "dinner", style: "meat" },
  { name: "BBQ in crockpot", meal: "dinner", style: "meat" },
  { name: "Braised short ribs", meal: "dinner", style: "meat" },
  { name: "Stew", meal: "dinner", style: "meat" },
  { name: "Deconstructed steak sandwiches with cheese", meal: "dinner", style: "meat" },

  { name: "Meatballs with zucchini and rice", meal: "dinner", style: "rice-or-pasta" },
  { name: "Hamburger stroganoff", meal: "dinner", style: "rice-or-pasta" },
  {
    name: "Tortellini with pesto and shrimp and spinach",
    meal: "dinner",
    style: "rice-or-pasta"
  },
  {
    name: "Tortellini with sausage, spinach, mushrooms, lemon",
    meal: "dinner",
    style: "rice-or-pasta"
  },
  { name: "Penne lasagne", meal: "dinner", style: "rice-or-pasta" },
  { name: "Lasagne", meal: "dinner", style: "rice-or-pasta" },
  { name: "Spaghetti", meal: "dinner", style: "rice-or-pasta" },
  { name: "Homemade mac n cheese", meal: "dinner", style: "rice-or-pasta" },
  { name: "Salmon and rice", meal: "dinner", style: "rice-or-pasta" },
  { name: "Zucchini and squash lasagne", meal: "dinner", style: "rice-or-pasta" },

  { name: "Stir fry", meal: "dinner", style: "other" },
  { name: "Lettuce wraps", meal: "dinner", style: "other" },
  { name: "Salmon veggie bowls", meal: "dinner", style: "other" },
  { name: "Chipotle bowls", meal: "dinner", style: "other" },
  { name: "Homemade pizza", meal: "dinner", style: "other" },
  {
    name: "Chicken tortilla soup in crock pot",
    meal: "dinner",
    style: "other",
    source: "https://dashofsanity.com/chicken-tortilla-soup-crock-pot/"
  },
  { name: "Chicken tortilla soup", meal: "dinner", style: "other" },
  { name: "Cheddar broccoli soup", meal: "dinner", style: "other" },
  { name: "Chicken wild rice soup", meal: "dinner", style: "other" },
  { name: "Wonton soup", meal: "dinner", style: "other" },
  { name: "Grilled cheese and tomato soup", meal: "dinner", style: "other" },

  {
    name: "White chicken chili",
    meal: "breakfast",
    style: "meat",
    source:
      "https://www.pinterest.com/pin/487233253450153141/sent/?invite_code=4fe827f3cea649cf9c9996a6747132c8&sender=487233390844584842&sfo=1"
  },
  {
    name: "Peanut chicken lettuce wraps with ginger garlic sauce",
    meal: "breakfast",
    style: "meat",
    source: "https://pinchofyum.com/peanut-chicken-lettuce-wraps-ginger-garlic-sauce"
  },
  { name: "Greek pitas with chicken", meal: "breakfast", style: "meat" },
  { name: "Greek pitas with turkey meat", meal: "breakfast", style: "meat" },

  {
    name: "Pineapple zucchini muffin",
    meal: "breakfast",
    style: "other",
    source: "https://www.blessthismessplease.com/zucchini-pineapple-muffins/"
  },
  {
    name: "Flourless chickpea peanut butter muffins",
    meal: "breakfast",
    style: "other",
    source: "https://www.ambitiouskitchen.com/flourless-peanut-butter-chickpea-muffins/"
  },
  {
    name: "Big daddy biscuits",
    meal: "breakfast",
    style: "other",
    source: "https://www.allrecipes.com/recipe/7040/jps-big-daddy-biscuits/"
  },
  {
    name: "Crusty bread",
    meal: "breakfast",
    style: "other",
    source: "https://www.recipetineats.com/easy-yeast-bread-recipe-no-knead/"
  },
  {
    name: "Spicy pesto and cheese stuffed zucchini involtin",
    meal: "breakfast",
    style: "other",
    source:
      "https://www.pinterest.com/pin/487233253440955193/sent/?invite_code=6cfdfc25e6084bb68f039422b2f63e6e&sender=487233390844584842&sfo=1"
  }
];

const mealFilter = document.querySelector("#mealFilter");
const styleFilter = document.querySelector("#styleFilter");
const queryFilter = document.querySelector("#queryFilter");
const recipeGrid = document.querySelector("#recipeGrid");
const resultCount = document.querySelector("#resultCount");

function pretty(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
    li.className = "card";
    li.style.animationDelay = `${Math.min(index * 20, 300)}ms`;

    const sourceHtml = recipe.source
      ? `<a class="sourceLink" href="${recipe.source}" target="_blank" rel="noopener noreferrer">Source</a>`
      : "";

    li.innerHTML = `
      <p class="recipeName">${recipe.name}</p>
      <div class="tags">
        <span class="tag">${pretty(recipe.meal)}</span>
        <span class="tag">${pretty(recipe.style)}</span>
      </div>
      ${sourceHtml}
    `;

    recipeGrid.appendChild(li);
  });
}

function applyFilters() {
  const meal = mealFilter.value;
  const style = styleFilter.value;
  const query = queryFilter.value.trim().toLowerCase();

  const filtered = RECIPES.filter((recipe) => {
    const matchesMeal = meal === "all" || recipe.meal === meal;
    const matchesStyle = style === "all" || recipe.style === style;
    const haystack = `${recipe.name} ${recipe.meal} ${recipe.style}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesMeal && matchesStyle && matchesQuery;
  });

  renderCards(filtered);
}

mealFilter.addEventListener("change", applyFilters);
styleFilter.addEventListener("change", applyFilters);
queryFilter.addEventListener("input", applyFilters);

applyFilters();
