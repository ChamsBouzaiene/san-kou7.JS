import { createNode, drawActors, drawGrid } from "./lib";

const scale = 20;
class DomDisplay {
  constructor(parent, level) {
    this.dom = createNode("div", { class: "game" }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() {
    this.dom.remove();
  }
}

DomDisplay.prototype.syncState = function (state) {
  if (this.actorLayer) this.actorLayer.remove();
  console.log(state.actors);
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

DomDisplay.prototype.scrollPlayerIntoView = function (state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;
  let left = this.dom.scrolLeft;
  let top = this.dom.scrolTop;
  let bottom = top + height;
  let right = left + width;
  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5).times(scale));
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
