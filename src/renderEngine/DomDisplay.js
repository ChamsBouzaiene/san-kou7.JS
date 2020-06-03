import { createNode, drawActors, drawGrid, updateActors } from "./lib";

const scale = 80;
class DomDisplay {
  constructor(parent, level) {
    this.dom = createNode("div", { class: "game" }, drawGrid(level));
    this.actorLayer = null;
    this.parent = parent;
    this.parent.appendChild(this.dom);
  }

  restart() {}

  pause() {}

  showMenu(status) {}

  clear() {
    this.dom.remove();
  }
}

// Create DoM Nodes

// DomDisplay.prototype.syncState = function (state) {

//   if (this.actorLayer) this.actorLayer.remove();

//   this.actorLayer = drawActors(state.actors);
//   this.dom.appendChild(this.actorLayer);
//   this.dom.className = `game ${state.status}`;
//   this.scrollPlayerIntoView(state);
// };

DomDisplay.prototype.syncState = function (state) {
  if (this.actorLayer) updateActors(this.actorLayer, state);
  if (!this.actorLayer) {
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
  }
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

DomDisplay.prototype.scrollPlayerIntoView = function (state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;

  // The viewport
  let left = this.dom.scrollLeft,
    right = left + width;
  let top = this.dom.scrollTop,
    bottom = top + height;

  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5)).times(scale);

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};

export default DomDisplay;
