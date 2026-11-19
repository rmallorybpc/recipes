// Inspiration video: a "Watch it made" button on slides that have a cooking
// video. The video plays inside the photo area. Loaded after inspiration-buildup.js.

const inspoVideo = { recipe: null, wasPaused: false, button: null, frame: null };

function inspoVideoButton() {
  if (!inspoVideo.button && inspo.add) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inspoBtn inspoWatch";
    button.hidden = true;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (inspoVideo.frame) {
        stopInspoVideo();
      } else {
        playInspoVideo();
      }
    });
    inspo.add.parentElement.appendChild(button);
    inspoVideo.button = button;
  }
  return inspoVideo.button;
}

function prepareInspoVideo(recipe) {
  stopInspoVideo();
  inspoVideo.recipe = recipe;
  const button = inspoVideoButton();
  if (button) {
    button.hidden = !recipe.video;
    button.textContent = "▶ Watch it made";
  }
}

function playInspoVideo() {
  const recipe = inspoVideo.recipe;
  const slide = inspo.image.closest(".inspoSlide");
  if (!recipe || !recipe.video || !slide) {
    return;
  }
  if (typeof buildToken === "number") {
    buildToken += 1;
  }
  slide.classList.remove("is-building");
  inspoVideo.wasPaused = inspo.userPaused;
  inspo.userPaused = true;
  restartInspoTimer();

  const frame = document.createElement("iframe");
  frame.className = "inspoVideo";
  frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(recipe.video)}?autoplay=1&playsinline=1&rel=0`;
  frame.allow = "autoplay; encrypted-media; picture-in-picture";
  frame.allowFullscreen = true;
  frame.title = `${inspo.title.textContent} video`;
  slide.appendChild(frame);
  slide.classList.add("is-playing");
  inspoVideo.frame = frame;
  inspoVideo.button.textContent = "Back to photo";
}

function stopInspoVideo() {
  if (!inspoVideo.frame) {
    return;
  }
  inspoVideo.frame.remove();
  inspoVideo.frame = null;
  const slide = inspo.image.closest(".inspoSlide");
  if (slide) {
    slide.classList.remove("is-playing");
  }
  if (inspoVideo.button) {
    inspoVideo.button.textContent = "▶ Watch it made";
  }
  inspo.userPaused = inspoVideo.wasPaused;
  restartInspoTimer();
}
