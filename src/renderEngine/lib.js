import State from "../lib/State";
import Animation from "./Animation";
import DOMActors from "./DOMActors";

import Menu from "../lib/Menu";

import { arrowKeys } from "./listeners";
import Music from "../lib/Music";
let scale = 80;

export const createNode = (name, attrs, ...children) => {
  let node = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    node.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    if (typeof child === "string") {
      return node.appendChild(document.createTextNode(child));
    }
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

const playerMovementStates = {};

const playerMovementMaper = {
  isMovingRight: (stance, speed) => stance === "right" && !speed.y,
  isMovingLeft: (stance, speed) => stance === "left" && !speed.y,
  isJumping: (stance, speed) => stance === "jump" || speed.y !== 0,
  isJumpingRight: (stance, speed) => {},
  isJumpingLeft: (stance, speed) => {},
};

function updatePlayerAnimation(playerNode, stance, speed) {
  const { isMovingRight, isMovingLeft, isJumping } = playerMovementMaper;
  if (isJumping(stance, speed)) {
    Music.jumpPlayer();
  }
  if (isMovingRight(stance, speed)) {
    Music.walkPlayer();
    playerNode.classList.remove("idle", "left", "jump");
    playerNode.classList.add("right");
  } else if (isMovingLeft(stance, speed)) {
    Music.walkPlayer();
    playerNode.classList.remove("idle", "right", "jump");
    playerNode.classList.add("left");
  } else if (stance === "jump" || speed.y) {
    Music.idlePlayer();
    playerNode.classList.remove("idle", "right", "left", "jump", "jump-left");
    if (stance === "left" || speed.x < 0) {
      playerNode.classList.add("jump-left");
    } else {
      playerNode.classList.add("jump");
    }
  } else {
    Music.idlePlayer();
    playerNode.classList.remove("right");
    playerNode.classList.remove("left");
    playerNode.classList.remove("jump");
    playerNode.classList.add("idle");
  }
}

function updatePlayer(nodes, state) {
  const playerNode = nodes.getElementsByClassName("player")[0];
  const { stance, speed } = state.player;
  updatePlayerAnimation(playerNode, stance, speed);
  if (state.player) updateActor(playerNode, state.player);
}

function updateLava(nodes, state) {
  const lavaNode = nodes.getElementsByClassName("lava");
  Array.from(lavaNode).forEach((lavaNode, i) => {
    if (state.lava) updateActor(lavaNode, state.lava[i]);
  });
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
  const coinNodes = nodes.getElementsByClassName("coin");
  const updateableCoins = syncCoins(state, coinNodes);
  Array.from(coinNodes).forEach((coinNode, i) => {
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
  actionReducer(state.action, actorLayer);
  // updateLava();

  return;
}

export function actionReducer(action, actors) {
  const player = DOMActors.getPlayer(actors);
  if (action == "coinEated") {
    Music.playCoin();
    Animation.collectedCoin(player);
  }
  Animation.cleanUP(player);
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

export function runLevel(level, dis, men, gameControler) {
  let menu = new Menu(gameControler);
  let music = new Music();
  music.BgPlayer();
  let display = dis;
  let state = State.start(level, menu);
  let ending = 1;

  return new Promise((resolve) => {
    runAnimation((time) => {
      if (gameControler.status === "paused") {
        Menu.updateMenu(gameControler.status);

        return;
      }
      if (gameControler.status === "playing") {
        Menu.updateMenu(gameControler.status);
      }

      if (gameControler.status === "lost") {
        Menu.updateMenu(gameControler.status);
      }
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status === "playing") {
        Menu.updateMenu(state.status);

        return true;
      } else if (state.status === "paused") {
        Menu.updateMenu(state.status);
        return true;
      } else if (state.status === "lost") {
        Music.lostplayer();
        Music.collidePlayer();
        music.BgPlayer("stop");

        Menu.updateMenu(state.status);
        resolve(state.status);

        return false;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        resolve(state.status);
        return false;
      }
    });
  });
}
