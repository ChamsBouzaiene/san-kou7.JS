import Vec from "./Vector";

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

class Player {
  constructor(pos, speed, stance) {
    this.pos = pos;
    this.speed = speed;
    this.stance = stance;
  }

  static updateStance(keys) {
    if (keys.ArrowUp) {
      return "jump";
    }
    if (keys.ArrowLeft) {
      return "left";
    }
    if (keys.ArrowRight) {
      return "right";
    }
    return "idle";
  }

  get type() {
    return "player";
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -2)), new Vec(0, 0));
  }
}

Player.prototype.size = new Vec(0.8, 1.5);
Player.prototype.update = function (time, state, keys) {
  let stance = Player.updateStance(keys);
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
  }

  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }
  return new Player(pos, new Vec(xSpeed, ySpeed), stance);
};

export default Player;
