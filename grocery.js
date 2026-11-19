// Grocery list: a button in the Weekly Planner that lists every ingredient
// for the recipes planned this week, with tick-off checkboxes.
// Loaded after grocery-parse.js. Uses weekPlan, recipesById and saveWeekPlan from script.js.

function plannedRecipeCounts() {
  const counts = new Map();
  Object.values(weekPlan || {}).forEach((day) => {
    Object.values(day || {}).forEach((ids) => {
      (Array.isArray(ids) ? ids : []).forEach((id) => counts.set(id, (counts.get(id) || 0) + 1));
    });
  });
  return counts;
}

async function renderGroceryList() {
  const panel = grocery.panel;
  if (!panel) return;
  const ingredients = await loadGroceryIngredients();
  const counts = plannedRecipeCounts();
  const items = new Map();

  counts.forEach((times, id) => {
    const recipe = recipesById.get(id);
    if (!recipe) return;
    const label = String(recipe.name).replace(/^(mealdb|suggested)\s*-\s*/i, "") + (times > 1 ? ` ×${times}` : "");
    (ingredients.get(id) || []).forEach((raw) => {
      const line = parseGroceryLine(raw);
      if (!line) return;
      if (!items.has(line.key)) items.set(line.key, { name: line.name, uses: [] });
      items.get(line.key).uses.push(line.amount ? `${line.amount} (${label})` : label);
    });
  });

  const ticks = groceryTicks();
  const list = panel.querySelector(".groceryItems");
  list.innerHTML = "";
  [...items.entries()].sort((a, b) => a[1].name.localeCompare(b[1].name)).forEach(([key, item]) => {
    const row = document.createElement("li");
    const label = document.createElement("label");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = ticks.has(key);
    row.classList.toggle("is-ticked", box.checked);
    box.addEventListener("change", () => {
      const current = groceryTicks();
      if (box.checked) current.add(key);
      else current.delete(key);
      saveGroceryTicks(current);
      row.classList.toggle("is-ticked", box.checked);
    });
    const name = document.createElement("span");
    name.className = "groceryName";
    name.textContent = item.name;
    const uses = document.createElement("span");
    uses.className = "groceryUses";
    uses.textContent = item.uses.join(" · ");
    label.append(box, name, uses);
    row.appendChild(label);
    list.appendChild(row);
  });

  panel.querySelector(".grocerySummary").textContent = counts.size
    ? `${items.size} items from ${counts.size} recipes`
    : "Add recipes to the planner to build your list.";
}

function toggleGroceryList() {
  if (grocery.panel) {
    grocery.panel.remove();
    grocery.panel = null;
    return;
  }
  const planner = document.querySelector(".planner");
  if (!planner) return;
  const panel = document.createElement("section");
  panel.className = "groceryPanel";
  panel.setAttribute("aria-label", "Grocery list");
  panel.innerHTML = `
    <div class="groceryHead">
      <h3>Grocery list</h3>
      <button class="groceryReset plannerActionButton tmg-btn-ghost" type="button">Uncheck all</button>
    </div>
    <p class="grocerySummary">Loading...</p>
    <ul class="groceryItems"></ul>`;
  panel.querySelector(".groceryReset").addEventListener("click", () => {
    saveGroceryTicks(new Set());
    renderGroceryList();
  });
  planner.appendChild(panel);
  grocery.panel = panel;
  renderGroceryList();
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

(function setUpGroceryList() {
  const actions = document.querySelector(".plannerActions");
  if (!actions) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "plannerActionButton tmg-btn-ghost";
  button.textContent = "Grocery list";
  button.addEventListener("click", toggleGroceryList);
  actions.prepend(button);

  const originalSave = saveWeekPlan;
  saveWeekPlan = function saveWeekPlanAndRefreshGrocery(...args) {
    originalSave.apply(this, args);
    if (grocery.panel) renderGroceryList();
  };
})();
