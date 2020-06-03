import State from "../lib/State";
import Animation from "./Animation";
import DOMActors from "./DOMActors";

import Menu from "../lib/Menu";

import { arrowKeys } from "./listeners";
let scale = 80;

// const toggleMenu = (val) => {
//   const menu = document.querySelector(".menu");
//   if (val) return (menu.style.display = "flex");
//   else {
//     return (menu.style.display = "none");
//   }
// };

// const setMenu = (title) => {
//   const menuTitle = document.querySelector(".status-title");
//   menuTitle.innerHTML = title;
//   toggleMenu(true);
// };

// const updateMenu = (status) => {
//   console.log("UPDATED", status);
//   if (status === "paused") {
//     return setMenu("PAUSED");
//   }
//   if (status === "lost") {
//     return setMenu("GAME OVER");
//   } else {
//     toggleMenu(false);
//   }
// };

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
  isJumping: (stance, speed) => stance === "jump" || speed.y,
  isJumpingRight: (stance, speed) => {},
  isJumpingLeft: (stance, speed) => {},
};

function updatePlayerAnimation(playerNode, stance, speed) {
  const { isMovingRight, isMovingLeft, isJumping } = playerMovementMaper;
  if (isMovingRight(stance, speed)) {
    playerNode.classList.remove("idle", "left", "jump");
    playerNode.classList.add("right");
  } else if (isMovingLeft(stance, speed)) {
    playerNode.classList.remove("idle", "right", "jump");
    playerNode.classList.add("left");
  } else if (stance === "jump" || speed.y) {
    playerNode.classList.remove("idle", "right", "left", "jump", "jump-left");
    if (stance === "left" || speed.x < 0) {
      playerNode.classList.add("jump-left");
    } else {
      playerNode.classList.add("jump");
    }
  } else {
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
  let display = dis;
  let state = State.start(level, menu);
  let ending = 1;

  return new Promise((resolve) => {
    runAnimation((time) => {
      if (gameControler.status === "paused") {
        // gameControler.setStatus("playing");
        Menu.updateMenu(gameControler.status);

        return;
      }
      if (gameControler.status === "playing") {
        // gameControler.setStatus("playing");
        Menu.updateMenu(gameControler.status);
      }

      if (gameControler.status === "lost") {
        // gameControler.setStatus("playing");
        Menu.updateMenu(gameControler.status);
      }
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status === "playing") {
        Menu.updateMenu(state.status);

        return true;
      } else if (state.status === "paused") {
        Menu.updateMenu(state.status);
        //display.clear();
        return true;
      } else if (state.status === "lost") {
        Menu.updateMenu(state.status);
        resolve(state.status);
        //display.menu();
        //display.clear();
        return false;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        //display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

// function runLevel(level, Display) {
//   let display = new Display(document.body, level);
//   let state = State.start(level);
//   let ending = 1;
//   let running = "yes";

//   return new Promise((resolve) => {
//     function escHandler(event) {
//       if (event.key != "Escape") return;
//       event.preventDefault();
//       if (running == "no") {
//         running = "yes";
//         runAnimation(frame);
//       } else if (running == "yes") {
//         running = "pausing";
//       } else {
//         running = "yes";
//       }
//     }
//     window.addEventListener("keydown", escHandler);
//     let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

//     function frame(time) {
//       if (running == "pausing") {
//         running = "no";
//         return false;
//       }

//       state = state.update(time, arrowKeys);
//       display.syncState(state);
//       if (state.status == "playing") {
//         return true;
//       } else if (ending > 0) {
//         ending -= time;
//         return true;
//       } else {
//         display.clear();
//         window.removeEventListener("keydown", escHandler);
//         arrowKeys.unregister();
//         resolve(state.status);
//         return false;
//       }
//     }
//     runAnimation(frame);
//   });
// }
