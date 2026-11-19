// Inspiration carousel controls: buttons, hover, swipe, and arrow keys.
// Loaded after inspiration.js and before script.js.

if (inspo.section) {
  inspo.prev.addEventListener("click", () => { stepInspo(-1); restartInspoTimer(); });
  inspo.next.addEventListener("click", () => { stepInspo(1); restartInspoTimer(); });
  inspo.pause.addEventListener("click", () => {
    inspo.userPaused = !inspo.userPaused;
    restartInspoTimer();
  });
  inspo.add.addEventListener("click", (event) => {
    event.stopPropagation();
    const recipe = inspo.pool[inspo.index];
    if (recipe) {
      inspo.userPaused = true;
      restartInspoTimer();
      ensureTouchPickerStyles();
      showMealDayPicker(recipe, inspo.add);
    }
  });

  const stage = inspo.section.querySelector(".inspoStage");
  const canHover = window.matchMedia("(hover: hover)").matches;
  stage.addEventListener("mouseenter", () => {
    if (canHover) { inspo.hoverPaused = true; restartInspoTimer(); }
  });
  stage.addEventListener("mouseleave", () => { inspo.hoverPaused = false; restartInspoTimer(); });
  document.addEventListener("visibilitychange", restartInspoTimer);

  let touchStartX = null;
  stage.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });
  stage.addEventListener("touchend", (event) => {
    if (touchStartX === null) {
      return;
    }
    const delta = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) > 40) {
      stepInspo(delta < 0 ? 1 : -1);
      restartInspoTimer();
    }
  }, { passive: true });

  inspo.section.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") { stepInspo(1); restartInspoTimer(); }
    if (event.key === "ArrowLeft") { stepInspo(-1); restartInspoTimer(); }
  });
}
