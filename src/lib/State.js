import { overlap } from "../renderEngine/physX";

class State {
  constructor(level, actors, status, action) {
    this.level = level;
    this.actors = actors;
    this.status = status;
    this.action = action;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  static nextStatus(prevStatus, keys) {
    if (prevStatus === "playing" && keys.Escape) {
      return "paused";
    }
    return prevStatus;
  }

  get player() {
    return this.actors.find((a) => a.type === "player");
  }
  get coin() {
    return this.actors.filter((a) => a.type === "coin");
  }
  get lava() {
    return this.actors.filter((a) => a.type === "lava");
  }
}

State.prototype.update = function (time, keys) {
  let actors = this.actors.map((actor) => actor.update(time, this, keys));
  //let status = State.nextStatus(this.status, keys);
  //let menu = this.menu.update(this, keys);
  let newState = new State(this.level, actors, this.status);
  if (newState.status != "playing") return newState;
  let player = newState.player;
  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }

  for (let actor of actors) {
    if (actor != player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }
  return newState;
};

export default State;
