const RECIPES = [
  { name: "Tacos", meal: "dinner", style: "handheld" },
  { name: "Skillet meatloaf / cheeseburger meatloaf", meal: "dinner", style: "meat" },
  { name: "Cheeseburgers", meal: "dinner", style: "meat" },
  { name: "Round steak stroganoff", meal: "dinner", style: "meat" },
  { name: "Pork chops", meal: "dinner", style: "meat" },
  { name: "Chicken parm", meal: "dinner", style: "meat" },
  { name: "Grilled chicken with potato salad", meal: "dinner", style: "meat" },
  { name: "Fried chicken", meal: "dinner", style: "meat" },
  { name: "Camper chicken enchiladas", meal: "dinner", style: "handheld" },
  { name: "Chicken wings", meal: "dinner", style: "meat" },
  { name: "Steak kabobs deconstructed", meal: "dinner", style: "meat" },
  { name: "Chili", meal: "dinner", style: "soup-or-stew" },
  { name: "BBQ in crockpot", meal: "dinner", style: "meat" },
  { name: "Braised short ribs", meal: "dinner", style: "meat" },
  { name: "Stew", meal: "dinner", style: "soup-or-stew" },
  { name: "Deconstructed steak sandwiches with cheese", meal: "dinner", style: "handheld" },

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

  { name: "Stir fry", meal: "dinner", style: "vegetarian" },
  { name: "Lettuce wraps", meal: "dinner", style: "handheld" },
  { name: "Salmon veggie bowls", meal: "dinner", style: "bowls" },
  { name: "Chipotle bowls", meal: "dinner", style: "bowls" },
  { name: "Homemade pizza", meal: "dinner", style: "baked-casserole" },
  {
    name: "Chicken tortilla soup in crock pot",
    meal: "dinner",
    style: "soup-or-stew",
    source: "https://dashofsanity.com/chicken-tortilla-soup-crock-pot/"
  },
  { name: "Chicken tortilla soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Cheddar broccoli soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Chicken wild rice soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Wonton soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Grilled cheese and tomato soup", meal: "dinner", style: "soup-or-stew" },

  {
    name: "White chicken chili",
    meal: "breakfast",
    style: "soup-or-stew",
    source:
      "https://www.pinterest.com/pin/487233253450153141/sent/?invite_code=4fe827f3cea649cf9c9996a6747132c8&sender=487233390844584842&sfo=1"
  },
  {
    name: "Peanut chicken lettuce wraps with ginger garlic sauce",
    meal: "breakfast",
    style: "handheld",
    source: "https://pinchofyum.com/peanut-chicken-lettuce-wraps-ginger-garlic-sauce"
  },
  { name: "Greek pitas with chicken", meal: "breakfast", style: "handheld" },
  { name: "Greek pitas with turkey meat", meal: "breakfast", style: "handheld" },

  {
    name: "Pineapple zucchini muffin",
    meal: "breakfast",
    style: "baked-casserole",
    source: "https://www.blessthismessplease.com/zucchini-pineapple-muffins/"
  },
  {
    name: "Flourless chickpea peanut butter muffins",
    meal: "breakfast",
    style: "baked-casserole",
    source: "https://www.ambitiouskitchen.com/flourless-peanut-butter-chickpea-muffins/"
  },
  {
    name: "Big daddy biscuits",
    meal: "breakfast",
    style: "baked-casserole",
    source: "https://www.allrecipes.com/recipe/7040/jps-big-daddy-biscuits/"
  },
  {
    name: "Crusty bread",
    meal: "breakfast",
    style: "baked-casserole",
    source: "https://www.recipetineats.com/easy-yeast-bread-recipe-no-knead/"
  },
  {
    name: "Spicy pesto and cheese stuffed zucchini involtin",
    meal: "breakfast",
    style: "vegetarian",
    source:
      "https://www.pinterest.com/pin/487233253440955193/sent/?invite_code=6cfdfc25e6084bb68f039422b2f63e6e&sender=487233390844584842&sfo=1"
  },
  { name: "Beef and broccoli", meal: "dinner", style: "meat" },
];

const mealFilter = document.querySelector("#mealFilter");
const styleFilter = document.querySelector("#styleFilter");
const queryFilter = document.querySelector("#queryFilter");
const recipeGrid = document.querySelector("#recipeGrid");
const resultCount = document.querySelector("#resultCount");
const plannerGrid = document.querySelector("#plannerGrid");
const plannerStatus = document.querySelector("#plannerStatus");
const clearCalendar = document.querySelector("#clearCalendar");
const copyPlan = document.querySelector("#copyPlan");
const exportPlan = document.querySelector("#exportPlan");
const printPlan = document.querySelector("#printPlan");
const recipeSubmitForm = document.querySelector("#recipeSubmitForm");
const submitPathPreview = document.querySelector("#submitPathPreview");
const submitStatus = document.querySelector("#submitStatus");
const copyRecipeMarkdown = document.querySelector("#copyRecipeMarkdown");

const STORAGE_KEY = "weeklyRecipePlanner.v1";
const GITHUB_OWNER = "rmallorybpc";
const GITHUB_REPO = "recipes";
const DAYS = [
  { key: "sunday", label: "Sunday" },
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" }
];
const MEALS = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" }
];

const recipesById = new Map();
let weekPlan = makeEmptyWeekPlan();
const breakfastExpandedByDay = DAYS.reduce((acc, day) => {
  acc[day.key] = false;
  return acc;
}, {});

function pretty(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toId(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toQuotedYamlArray(value) {
  const tags = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `"${item.replace(/"/g, "\\\"")}"`);

  return `[${tags.join(", ")}]`;
}

function toLineItems(value, prefix) {
  const items = value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!items.length) {
    return [prefix === "-" ? "- " : "1. "];
  }

  if (prefix === "-") {
    return items.map((item) => `- ${item}`);
  }

  return items.map((item, index) => `${index + 1}. ${item}`);
}

function buildSuggestedPath(title, meal, style) {
  return `recipes/${meal}/${style}/${toId(title || "new-recipe")}.md`;
}

function buildRecipeMarkdown(data) {
  const ingredients = toLineItems(data.ingredients, "-");
  const instructions = toLineItems(data.instructions, "1.");
  const notes = toLineItems(data.notes, "-");
  const sourceNote = data.source ? [`- Source: ${data.source}`] : [];
  const summary = data.summary || "A short description of the dish.";

  return [
    "---",
    `title: \"${data.title.replace(/\"/g, "\\\"")}\"`,
    `meal: ${data.meal}`,
    `style: ${data.style}`,
    `protein: \"${data.protein.replace(/\"/g, "\\\"")}\"`,
    `cuisine: \"${data.cuisine.replace(/\"/g, "\\\"")}\"`,
    `time_minutes: ${data.timeMinutes}`,
    `servings: ${data.servings}`,
    `keywords: ${toQuotedYamlArray(data.keywords)}`,
    "---",
    "",
    "# Summary",
    "",
    summary,
    "",
    "# Ingredients",
    "",
    ...ingredients,
    "",
    "# Instructions",
    "",
    ...instructions,
    "",
    "# Notes",
    "",
    ...notes,
    ...sourceNote
  ].join("\n");
}

function collectSubmissionData() {
  if (!(recipeSubmitForm instanceof HTMLFormElement)) {
    return null;
  }

  const formData = new FormData(recipeSubmitForm);
  const title = (formData.get("title") || "").toString().trim();

  return {
    title,
    meal: (formData.get("meal") || "dinner").toString(),
    style: (formData.get("style") || "meat").toString(),
    protein: (formData.get("protein") || "").toString().trim(),
    cuisine: (formData.get("cuisine") || "").toString().trim(),
    timeMinutes: Number.parseInt((formData.get("time_minutes") || "0").toString(), 10) || 0,
    servings: Number.parseInt((formData.get("servings") || "0").toString(), 10) || 0,
    keywords: (formData.get("keywords") || "").toString(),
    summary: (formData.get("summary") || "").toString().trim(),
    ingredients: (formData.get("ingredients") || "").toString(),
    instructions: (formData.get("instructions") || "").toString(),
    notes: (formData.get("notes") || "").toString(),
    source: (formData.get("source") || "").toString().trim()
  };
}

function buildIssueUrl(data, suggestedPath, markdown) {
  const issueTitle = `Recipe submission: ${data.title}`;
  const issueBody = [
    "## Proposed Recipe",
    "",
    `Suggested file path: ${suggestedPath}`,
    "",
    "Please review and add this recipe markdown file:",
    "",
    "```md",
    markdown,
    "```"
  ].join("\n");

  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
}

function updateSubmitPathPreview() {
  if (!(recipeSubmitForm instanceof HTMLFormElement) || !submitPathPreview) {
    return;
  }

  const formData = new FormData(recipeSubmitForm);
  const title = (formData.get("title") || "").toString().trim();
  const meal = (formData.get("meal") || "dinner").toString();
  const style = (formData.get("style") || "meat").toString();
  const path = buildSuggestedPath(title, meal, style);
  submitPathPreview.textContent = `Suggested file path: ${path}`;
}

function setSubmitStatus(message) {
  if (!submitStatus) {
    return;
  }

  submitStatus.textContent = message;
}

async function copyRecipeTemplateMarkdown() {
  const data = collectSubmissionData();
  if (!data || !data.title) {
    setSubmitStatus("Enter a recipe title first.");
    return;
  }

  const markdown = buildRecipeMarkdown(data);

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(markdown);
      setSubmitStatus("Recipe markdown copied.");
      return;
    }
  } catch (_error) {
    setSubmitStatus("Copy failed. Use Create GitHub Issue instead.");
  }
}

function submitRecipeIssue(event) {
  event.preventDefault();

  const data = collectSubmissionData();
  if (!data || !data.title) {
    setSubmitStatus("Recipe title is required.");
    return;
  }

  const suggestedPath = buildSuggestedPath(data.title, data.meal, data.style);
  const markdown = buildRecipeMarkdown(data);
  const issueUrl = buildIssueUrl(data, suggestedPath, markdown);

  window.open(issueUrl, "_blank", "noopener");
  setSubmitStatus("Opened GitHub Issue with your prefilled recipe.");
}

function makeEmptyWeekPlan() {
  return DAYS.reduce((acc, day) => {
    acc[day.key] = makeEmptyMealPlan();
    return acc;
  }, {});
}

function makeEmptyMealPlan() {
  return MEALS.reduce((acc, meal) => {
    acc[meal.key] = [];
    return acc;
  }, {});
}

function hydrateRecipeIds() {
  RECIPES.forEach((recipe, index) => {
    const id = `${toId(recipe.name)}-${index}`;
    recipe.id = id;
    recipesById.set(id, recipe);
  });
}

function loadWeekPlan() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return makeEmptyWeekPlan();
    }

    const parsed = JSON.parse(saved);
    const normalized = makeEmptyWeekPlan();

    DAYS.forEach(({ key }) => {
      const dayValue = parsed[key];

      if (Array.isArray(dayValue)) {
        dayValue.forEach((recipeId) => {
          if (!recipesById.has(recipeId)) {
            return;
          }
          const recipe = recipesById.get(recipeId);
          const mealKey = MEALS.some((meal) => meal.key === recipe.meal) ? recipe.meal : "dinner";
          if (!normalized[key][mealKey].includes(recipeId)) {
            normalized[key][mealKey].push(recipeId);
          }
        });
        return;
      }

      MEALS.forEach(({ key: mealKey }) => {
        const mealItems = Array.isArray(dayValue?.[mealKey]) ? dayValue[mealKey] : [];
        normalized[key][mealKey] = mealItems.filter((recipeId) => recipesById.has(recipeId));
      });
    });

    return normalized;
  } catch (_error) {
    return makeEmptyWeekPlan();
  }
}

function saveWeekPlan() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(weekPlan));
}

function addRecipeToDay(dayKey, mealKey, recipeId) {
  if (!recipesById.has(recipeId) || !weekPlan[dayKey]?.[mealKey]) {
    return;
  }

  if (!weekPlan[dayKey][mealKey].includes(recipeId)) {
    weekPlan[dayKey][mealKey].push(recipeId);
    saveWeekPlan();
    renderPlanner();
  }
}

function removeRecipeFromDay(dayKey, mealKey, recipeId) {
  if (!weekPlan[dayKey]?.[mealKey]) {
    return;
  }

  weekPlan[dayKey][mealKey] = weekPlan[dayKey][mealKey].filter((id) => id !== recipeId);
  saveWeekPlan();
  renderPlanner();
}

function clearDay(dayKey) {
  if (!weekPlan[dayKey]) {
    return;
  }

  const hasItems = MEALS.some(({ key }) => weekPlan[dayKey][key].length > 0);
  if (!hasItems) {
    return;
  }

  weekPlan[dayKey] = makeEmptyMealPlan();
  saveWeekPlan();
  renderPlanner();
}

function clearWholeWeek() {
  weekPlan = makeEmptyWeekPlan();
  saveWeekPlan();
  renderPlanner();
}

function toggleBreakfastLane(dayKey) {
  if (!Object.prototype.hasOwnProperty.call(breakfastExpandedByDay, dayKey)) {
    return;
  }

  breakfastExpandedByDay[dayKey] = !breakfastExpandedByDay[dayKey];
  renderPlanner();
}

function renderPlanner() {
  plannerGrid.innerHTML = "";

  DAYS.forEach((day) => {
    const li = document.createElement("li");
    li.className = "dayColumn";
    li.dataset.day = day.key;
    li.innerHTML = `<h3 class="dayTitle">${day.label}</h3><div class="mealLanes"></div>`;

    const mealLanes = li.querySelector(".mealLanes");

    MEALS.forEach((meal) => {
      const lane = document.createElement("section");
      lane.className = "mealLane";
      lane.dataset.day = day.key;
      lane.dataset.meal = meal.key;
      let laneList;

      if (meal.key === "breakfast") {
        const expanded = breakfastExpandedByDay[day.key];
        const panelId = `breakfast-${day.key}-panel`;
        lane.classList.add("mealLaneBreakfast");

        lane.innerHTML = `
          <button
            type="button"
            class="mealLaneToggle"
            data-day="${day.key}"
            aria-expanded="${expanded}"
            aria-controls="${panelId}"
          >
            <span class="mealLaneTitle">${meal.label}</span>
            <span class="mealLaneToggleIcon" aria-hidden="true">${expanded ? "-" : "+"}</span>
          </button>
          <div class="mealLaneBody" id="${panelId}" ${expanded ? "" : "hidden"}>
            <ul class="dayList"></ul>
          </div>
        `;
      } else {
        lane.innerHTML = `<h4 class="mealLaneTitle">${meal.label}</h4><ul class="dayList"></ul>`;
      }

      laneList = lane.querySelector(".dayList");
      const plannedIds = weekPlan[day.key][meal.key];

      if (!plannedIds.length) {
        const hint = document.createElement("p");
        hint.className = "dayHint";
        hint.textContent = "Drop recipes here";
        laneList.appendChild(hint);
      } else {
        plannedIds.forEach((recipeId) => {
          const recipe = recipesById.get(recipeId);
          if (!recipe) {
            return;
          }

          const item = document.createElement("li");
          item.className = "dayRecipe";
          item.innerHTML = `
            <p class="dayRecipeName">${recipe.name}</p>
            <button type="button" class="removePlanned" data-day="${day.key}" data-meal="${meal.key}" data-recipe="${recipeId}">Remove</button>
          `;
          laneList.appendChild(item);
        });
      }

      lane.addEventListener("dragover", (event) => {
        event.preventDefault();
        lane.classList.add("isOver");
      });

      lane.addEventListener("dragleave", () => {
        lane.classList.remove("isOver");
      });

      lane.addEventListener("drop", (event) => {
        event.preventDefault();
        lane.classList.remove("isOver");
        const recipeId = event.dataTransfer.getData("text/plain");
        addRecipeToDay(day.key, meal.key, recipeId);
      });

      mealLanes.appendChild(lane);
    });

    const clearDayButton = document.createElement("button");
    clearDayButton.type = "button";
    clearDayButton.className = "clearDayButton";
    clearDayButton.dataset.day = day.key;
    clearDayButton.textContent = "Clear Day";
    li.appendChild(clearDayButton);

    plannerGrid.appendChild(li);
  });
}

function dayOptions(selectedDay = DAYS[0].key) {
  return DAYS.map((day) => {
    const selected = day.key === selectedDay ? "selected" : "";
    return `<option value="${day.key}" ${selected}>${day.label}</option>`;
  }).join("");
}

function mealOptions(selectedMeal = "dinner") {
  return MEALS.map((meal) => {
    const selected = meal.key === selectedMeal ? "selected" : "";
    return `<option value="${meal.key}" ${selected}>${meal.label}</option>`;
  }).join("");
}

function buildPlanExport() {
  const lines = ["Weekly Recipe Plan", `Generated: ${new Date().toLocaleString()}`, ""];

  DAYS.forEach((day) => {
    lines.push(day.label);

    MEALS.forEach((meal) => {
      const items = weekPlan[day.key][meal.key]
        .map((recipeId) => recipesById.get(recipeId)?.name)
        .filter(Boolean);

      if (!items.length) {
        lines.push(`  ${meal.label}: -`);
        return;
      }

      lines.push(`  ${meal.label}:`);
      items.forEach((item) => lines.push(`    - ${item}`));
    });

    lines.push("");
  });

  return lines.join("\n");
}

function exportWeeklyPlan() {
  const content = buildPlanExport();
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "weekly-recipe-plan.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setPlannerStatus(message) {
  plannerStatus.textContent = message;
}

async function copyWeeklyPlan() {
  const content = buildPlanExport();

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(content);
      setPlannerStatus("Weekly plan copied to clipboard.");
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    setPlannerStatus("Weekly plan copied to clipboard.");
  } catch (_error) {
    setPlannerStatus("Copy failed. Use Export instead.");
  }
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
    li.draggable = true;
    li.dataset.recipeId = recipe.id;

    li.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", recipe.id);
      event.dataTransfer.effectAllowed = "copy";
    });

    const sourceHtml = recipe.source
      ? `<a class="sourceLink" href="${recipe.source}" target="_blank" rel="noopener noreferrer">Source</a>`
      : "";

    li.innerHTML = `
      <p class="recipeName">${recipe.name}</p>
      <div class="tags">
        <span class="tag">${pretty(recipe.meal)}</span>
        <span class="tag">${pretty(recipe.style)}</span>
      </div>
      <div class="addToPlan">
        <select class="addDay" aria-label="Day for ${recipe.name}">
          ${dayOptions()}
        </select>
        <select class="addMeal" aria-label="Meal slot for ${recipe.name}">
          ${mealOptions(recipe.meal)}
        </select>
        <button type="button" class="addToPlanButton">Add</button>
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

plannerGrid.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.classList.contains("removePlanned")) {
    const { day, meal, recipe } = target.dataset;
    if (day && meal && recipe) {
      removeRecipeFromDay(day, meal, recipe);
    }
  }

  if (target.classList.contains("clearDayButton")) {
    const { day } = target.dataset;
    if (day) {
      clearDay(day);
    }
  }

  if (target.closest(".mealLaneToggle")) {
    const toggleButton = target.closest(".mealLaneToggle");
    if (toggleButton instanceof HTMLElement) {
      const { day } = toggleButton.dataset;
      if (day) {
        toggleBreakfastLane(day);
      }
    }
  }
});

recipeGrid.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement) || !target.classList.contains("addToPlanButton")) {
    return;
  }

  const card = target.closest(".card");
  if (!(card instanceof HTMLElement)) {
    return;
  }

  const daySelect = card.querySelector(".addDay");
  const mealSelect = card.querySelector(".addMeal");
  const recipeId = card.dataset.recipeId;

  if (
    recipeId &&
    daySelect instanceof HTMLSelectElement &&
    mealSelect instanceof HTMLSelectElement
  ) {
    addRecipeToDay(daySelect.value, mealSelect.value, recipeId);
  }
});

clearCalendar.addEventListener("click", clearWholeWeek);
copyPlan.addEventListener("click", copyWeeklyPlan);
exportPlan.addEventListener("click", exportWeeklyPlan);
printPlan.addEventListener("click", () => window.print());

mealFilter.addEventListener("change", applyFilters);
styleFilter.addEventListener("change", applyFilters);
queryFilter.addEventListener("input", applyFilters);

if (recipeSubmitForm instanceof HTMLFormElement) {
  recipeSubmitForm.addEventListener("input", updateSubmitPathPreview);
  recipeSubmitForm.addEventListener("submit", submitRecipeIssue);
  updateSubmitPathPreview();
}

if (copyRecipeMarkdown) {
  copyRecipeMarkdown.addEventListener("click", copyRecipeTemplateMarkdown);
}

hydrateRecipeIds();
weekPlan = loadWeekPlan();
renderPlanner();
applyFilters();
