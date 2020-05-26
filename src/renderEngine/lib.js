import State from "../lib/State";
import Menu from "../lib/Menu";

import { arrowKeys } from "./listeners";
let scale = 80;

export const createNode = (name, attrs, ...children) => {
  let node = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
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
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    })
  );
}

function updatePlayerAnimation(playerNode, stance) {
  console.log(playerNode, stance);
  if (stance === "right") {
    playerNode.classList.remove("idle");
    playerNode.classList.remove("left");
    playerNode.classList.remove("jump");
    playerNode.classList.add("right");
  } else if (stance === "left") {
    playerNode.classList.remove("idle");
    playerNode.classList.remove("right");
    playerNode.classList.remove("jump");

    playerNode.classList.add("left");
  } else if (stance === "jump") {
    playerNode.classList.remove("idle");
    playerNode.classList.remove("right");
    playerNode.classList.remove("left");
    playerNode.classList.add("jump");
  } else {
    playerNode.classList.remove("right");
    playerNode.classList.remove("left");
    playerNode.classList.remove("jump");
    playerNode.classList.add("idle");
  }
}

function updatePlayer(nodes, state) {
  const playerNode = nodes.getElementsByClassName("player")[0];
  const { stance } = state.player;
  updatePlayerAnimation(playerNode, stance);
  if (state.player) updateActor(playerNode, state.player);
}

function updateLava(nodes, state) {
  const lavaNode = nodes.getElementsByClassName("lava")[0];
  if (state.lava) updateActor(lavaNode, state.lava);
}

function syncCoins(state, display) {
  const numberOfDisplayedCoins = Array.from(display).length;
  const numberOfStateCoins = state.coin.length;
  if (numberOfStateCoins < numberOfDisplayedCoins) {
    display[0].remove();
    return syncCoins(state, display);
  }

  return Array.from(display);
}

function updateCoin(nodes, state) {
  console.log(state.coin);
  const coinNodes = nodes.getElementsByClassName("coin");
  const updateableCoins = syncCoins(state, coinNodes);
  Array.from(coinNodes).forEach((coinNode, i) => {
    console.log(state.coin[i]);
    if (state.coin && state.coin[i]) updateActor(coinNode, state.coin[i]);
  });
}

const updateActor = (node, actor) => {
  node.style.width = `${actor.size.x * scale}px`;
  node.style.height = `${actor.size.y * scale}px`;
  node.style.left = `${actor.pos.x * scale}px`;
  node.style.top = `${actor.pos.y * scale}px`;
};

export function updateActors(actorLayer, state) {
  updatePlayer(actorLayer, state);
  updateLava(actorLayer, state);
  updateCoin(actorLayer, state);
  // updateLava();

  return;
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

export function runLevel(level, dis) {
  let menu = new Menu();
  let display = dis;
  let state = State.start(level, menu.state);
  let ending = 1;
  let pause = 0;
  return new Promise((resolve) => {
    runAnimation((time) => {
      if (true) {
        state = state.update(time, arrowKeys);
        display.syncState(state);
        if (state.status === "playing") {
          pause++;
          return true;
        } else if (state.status === "lost") {
          display.clear();
          resolve(state.status);
          return false;
        } else if (ending > 0) {
          ending -= time;
          return true;
        } else {
          display.clear();
          resolve(state.status);
          return false;
        }
      }
    });
  });
}
