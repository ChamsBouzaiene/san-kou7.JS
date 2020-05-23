import Vec from "./Vector";
import { levelChars } from "../data/levels";

class Level {
  constructor(plan) {
    let rows = plan
      .trim()
      .split("\n")
      .map((l) => [...l]);

    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];
    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        console.log(ch);

        if (typeof type == "string") return type;
        console.log(type);
        this.startActors.push(type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }
}

Level.prototype.touches = function (pos, size, type) {
  let xStart = Math.floor(pos.x);
  let xEnd = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y);
  let yEnd = Math.floor(pos.y + size.y);
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here === type) return true;
    }
  }
  return false;
};

export default Level;
