function track(event) {
  if (keys.includes(event.key)) {
    down[event.key] = event.type == "keydown";
    event.preventDefault();
  }
}

export function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    console.log(event.key);
    if (keys.includes(event.key)) {
      down[event.key] = event.type === "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  window.addEventListener("Escape", track);
  return down;
}

export const arrowKeys = trackKeys([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "Escape",
]);
