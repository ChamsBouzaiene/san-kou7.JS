function track(event) {
  if (keys.includes(event.key)) {
    down[event.key] = event.type == "keydown";
    event.preventDefault();
  }
}

export function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
}

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
