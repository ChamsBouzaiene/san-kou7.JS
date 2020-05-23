import "./style/main.css";

import Level from "./lib/Level";
import State from "./lib/State";
import { groundLevel } from "./data/levels";
import DomDisplay from "./renderEngine/DomDisplay";

let simpleLevel = new Level(groundLevel);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);
console.log(simpleLevel.rows);
let display = new DomDisplay(document.body, simpleLevel);
console.log(simpleLevel.startActors);
display.syncState(State.start(simpleLevel));
// → 22 by 9

console.log("hello world");
