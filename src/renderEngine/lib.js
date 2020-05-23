let scale = 20;

export const createNode = (name, attrs, ...children) => {
  console.log(name, attrs);
  let node = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    console.log(attr, attrs[attr]);
    node.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    node.appendChild(child);
  }
  return node;
};

export function drawGrid(level) {
  return createNode(
    "table",
    {
      class: "background",
      style: `width: ${level.width * scale}px`,
    },
    ...level.rows.map((row) =>
      createNode(
        "tr",
        { style: `height: ${scale}px` },
        ...row.map((type) => {
          return createNode("td", { class: type });
        })
      )
    )
  );
}

export function drawActors(actors) {
  return createNode(
    "div",
    {},
    ...actors.map((actor) => {
      let rect = createNode("div", { class: "actor " + actor.type });
      console.log(actor.size, "tttt");
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.size.y * scale}px`;
      return rect;
    })
  );
}

export function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime !== null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise((resolve) => {
    state = state.update(time, arrowKeys);
    display.syncState(state);
    if (state.status === "playing") {
      return true;
    } else if (ending > 0) {
      ending -= time;
      return true;
    } else {
      display.clear();
      resolve(state.status);
      return false;
    }
  });
}
