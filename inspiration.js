// Inspiration carousel: rotating finished-dish photos above the planner.
// Loaded before script.js. Uses recipes, pretty, showMealDayPicker and
// ensureTouchPickerStyles from script.js at run time.

const INSPO_INTERVAL_MS = 10000;
const inspo = {
  section: document.getElementById("inspiration"),
  image: document.getElementById("inspoImage"),
  title: document.getElementById("inspoTitle"),
  tags: document.getElementById("inspoTags"),
  link: document.getElementById("inspoLink"),
  add: document.getElementById("inspoAdd"),
  prev: document.getElementById("inspoPrev"),
  next: document.getElementById("inspoNext"),
  pause: document.getElementById("inspoPause"),
  count: document.getElementById("inspoCount"),
  pool: [],
  index: 0,
  timer: null,
  userPaused: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  hoverPaused: false,
  poolKey: ""
};

function shuffled(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function updateInspiration(items) {
  if (!inspo.section) {
    return;
  }

  const withPhotos = items.filter((recipe) => recipe.image && !recipe.isSpecial);
  const key = withPhotos.map((recipe) => recipe.id).join("|");
  if (key === inspo.poolKey) {
    return;
  }
  inspo.poolKey = key;

  if (!withPhotos.length) {
    inspo.section.hidden = true;
    stopInspoTimer();
    return;
  }

  inspo.section.hidden = false;
  inspo.pool = shuffled(withPhotos);
  inspo.index = 0;
  showInspoSlide();
  restartInspoTimer();
}

function showInspoSlide() {
  const recipe = inspo.pool[inspo.index];
  if (!recipe) {
    return;
  }

  const slide = inspo.image.closest(".inspoSlide");
  slide.classList.remove("is-visible");

  const img = new Image();
  const src = recipeImageUrl(recipe.image, "large");
  const reveal = (finalSrc) => {
    if (inspo.pool[inspo.index] !== recipe) {
      return;
    }
    inspo.image.src = finalSrc;
    const title = String(recipe.name).replace(/^(mealdb|suggested)\s*-\s*/i, "");
    inspo.image.alt = `Finished dish: ${title}`;
    inspo.title.textContent = title;
    inspo.tags.textContent = `${pretty(recipe.meal)} · ${pretty(recipe.style)}`;
    if (recipe.source) {
      inspo.link.href = recipe.source;
      inspo.link.hidden = false;
    } else {
      inspo.link.removeAttribute("href");
      inspo.link.hidden = true;
    }
    inspo.count.textContent = `${inspo.index + 1} of ${inspo.pool.length}`;
    requestAnimationFrame(() => slide.classList.add("is-visible"));
    preloadInspo(inspo.index + 1);
    if (typeof playBuildUp === "function") {
      playBuildUp(recipe, slide);
    }
  };
  img.onload = () => reveal(img.src);
  let triedOriginal = src === recipe.image;
  img.onerror = () => {
    if (!triedOriginal) {
      triedOriginal = true;
      img.src = recipe.image;
      return;
    }
    dropInspoSlide(recipe);
  };
  img.src = src;
}

// A photo that will not load is removed from the rotation.
function dropInspoSlide(recipe) {
  const position = inspo.pool.indexOf(recipe);
  if (position === -1) {
    return;
  }
  inspo.pool.splice(position, 1);
  if (!inspo.pool.length) {
    inspo.section.hidden = true;
    stopInspoTimer();
    return;
  }
  inspo.index = position % inspo.pool.length;
  showInspoSlide();
}

function preloadInspo(position) {
  const recipe = inspo.pool[position % inspo.pool.length];
  if (recipe) {
    const img = new Image();
    img.src = recipeImageUrl(recipe.image, "large");
    if (typeof preloadBuildUp === "function") {
      preloadBuildUp(recipe);
    }
  }
}

function stepInspo(direction) {
  if (!inspo.pool.length) {
    return;
  }
  inspo.index = (inspo.index + direction + inspo.pool.length) % inspo.pool.length;
  showInspoSlide();
}

function stopInspoTimer() {
  clearInterval(inspo.timer);
  inspo.timer = null;
}

function restartInspoTimer() {
  stopInspoTimer();
  const paused = inspo.userPaused || inspo.hoverPaused || document.hidden;
  if (!paused && inspo.pool.length > 1) {
    inspo.timer = setInterval(() => stepInspo(1), INSPO_INTERVAL_MS);
  }
  if (inspo.pause) {
    inspo.pause.textContent = inspo.userPaused ? "Play" : "Pause";
    inspo.pause.setAttribute("aria-pressed", String(inspo.userPaused));
  }
}
