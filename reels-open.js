// Reels open and close: builds the full-screen feed, watches which reel is on
// screen, and handles keys. Loaded after reels.js.

function openReels(mode) {
  const pool = inspo.pool.filter((recipe) => mode === "photos" || recipe.video);
  if (!pool.length) return;
  const current = inspo.pool[inspo.index];
  const start = Math.max(0, pool.indexOf(current));

  if (typeof stopInspoVideo === "function") stopInspoVideo();
  reels.wasPaused = inspo.userPaused;
  inspo.userPaused = true;
  restartInspoTimer();

  const root = document.createElement("div");
  root.className = "reels";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", mode === "videos" ? "Recipe videos" : "Recipe photos");
  root.innerHTML = `
    <div class="reelsBar">
      <button class="reelsClose" type="button" aria-label="Close">&times;</button>
      <span class="reelsMode">${mode === "videos" ? "Videos" : "Photos"}</span>
      <span class="reelsHint">Swipe up</span>
    </div>
    <div class="reelsList"></div>`;
  const list = root.querySelector(".reelsList");
  reels.items = pool.map((recipe) => {
    const el = buildReel(recipe, mode);
    list.appendChild(el);
    return { recipe, el };
  });
  reels.root = root;
  reels.list = list;
  reels.active = -1;
  window.scrollTo(0, window.scrollY);
  document.body.appendChild(root);
  document.body.classList.add("reels-open");

  reels.observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activateReel(reels.items.findIndex((item) => item.el === entry.target), mode);
      }
    });
  }, { root: list, threshold: 0.6 });
  reels.items.forEach((item) => reels.observer.observe(item.el));

  list.scrollTop = start * list.clientHeight;
  root.querySelector(".reelsClose").addEventListener("click", closeReels);
  root.querySelector(".reelsClose").focus();
}

function closeReels() {
  if (!reels.root) return;
  reels.observer.disconnect();
  reels.root.remove();
  reels.root = null;
  reels.items = [];
  reels.active = -1;
  document.body.classList.remove("reels-open");
  inspo.userPaused = reels.wasPaused;
  restartInspoTimer();
}

document.addEventListener("keydown", (event) => {
  if (!reels.root) return;
  if (event.key === "Escape") closeReels();
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    reels.list.scrollBy({ top: step * reels.list.clientHeight, behavior: "smooth" });
  }
});

addReelButtons();
