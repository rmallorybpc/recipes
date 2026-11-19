// Reels: a full-screen vertical feed opened from the carousel header.
// Photos shows every dish with its ingredient build-up. Videos shows dishes
// with a cooking video, which autoplays muted. Loaded after inspiration-video.js.

const reels = { root: null, list: null, items: [], active: -1, observer: null, wasPaused: false };

function reelTitle(recipe) {
  return String(recipe.name).replace(/^(mealdb|suggested)\s*-\s*/i, "");
}

function addReelButtons() {
  const head = inspo.section && inspo.section.querySelector(".inspoHead");
  if (!head) return;
  const group = document.createElement("div");
  group.className = "reelOpeners";
  [["photos", "Photos"], ["videos", "▶ Videos"]].forEach(([mode, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "reelOpen";
    button.textContent = label;
    button.addEventListener("click", () => openReels(mode));
    group.appendChild(button);
  });
  head.appendChild(group);
}

function buildReel(recipe, mode) {
  const reel = document.createElement("section");
  reel.className = "reel";
  const photo = recipeImageUrl(recipe.image, "large");
  reel.innerHTML = `
    <img class="reelBlur" alt="" src="${photo}" loading="lazy">
    <div class="reelMedia ${mode === "videos" ? "reelMedia--video" : ""}">
      <img class="reelPhoto" alt="" src="${photo}" loading="lazy">
      <div class="reelBuild"></div>
    </div>
    <div class="reelInfo">
      <p class="reelName"></p>
      <p class="reelTags"></p>
      <div class="reelActions">
        <button class="reelAdd" type="button">+ Add to plan</button>
        <a class="reelLink" target="_blank" rel="noopener noreferrer">View recipe</a>
      </div>
    </div>`;
  reel.querySelector(".reelName").textContent = reelTitle(recipe);
  reel.querySelector(".reelTags").textContent = `${pretty(recipe.meal)} · ${pretty(recipe.style)}`;
  reel.querySelector(".reelPhoto").alt = `Finished dish: ${reelTitle(recipe)}`;
  const link = reel.querySelector(".reelLink");
  if (recipe.source) link.href = recipe.source;
  else link.hidden = true;
  const add = reel.querySelector(".reelAdd");
  add.addEventListener("click", () => {
    ensureTouchPickerStyles();
    showMealDayPicker(recipe, add);
  });
  return reel;
}

function activateReel(index, mode) {
  if (index === reels.active) return;
  const old = reels.items[reels.active];
  if (old) {
    old.el.querySelector(".reelBuild").innerHTML = "";
    old.el.classList.remove("is-building");
    const frame = old.el.querySelector("iframe");
    if (frame) frame.remove();
  }
  reels.active = index;
  const item = reels.items[index];
  if (!item) return;
  const media = item.el.querySelector(".reelMedia");

  if (mode === "videos") {
    const frame = document.createElement("iframe");
    const id = encodeURIComponent(item.recipe.video);
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${id}&rel=0`;
    frame.allow = "autoplay; encrypted-media; picture-in-picture";
    frame.allowFullscreen = true;
    frame.title = `${reelTitle(item.recipe)} video`;
    media.appendChild(frame);
    return;
  }

  const names = typeof buildIngredients === "function" ? buildIngredients(item.recipe) : [];
  if (buildCalm || !names.length) return;
  const grid = item.el.querySelector(".reelBuild");
  const chips = names.map((name) => {
    const chip = document.createElement("div");
    chip.className = "inspoChip";
    const img = document.createElement("img");
    img.alt = "";
    img.addEventListener("error", () => chip.remove(), { once: true });
    img.src = ingredientImageUrl(name);
    const label = document.createElement("span");
    label.textContent = name;
    chip.append(img, label);
    grid.appendChild(chip);
    return chip;
  });
  item.el.classList.add("is-building");
  chips.forEach((chip, i) => setTimeout(() => {
    if (reels.active === index) chip.classList.add("on");
  }, 150 + i * 140));
  setTimeout(() => {
    if (reels.active === index) item.el.classList.remove("is-building");
  }, 150 + chips.length * 140 + 600);
}
