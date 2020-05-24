require("babel-core/register");
require("babel-polyfill");

import "./style/main.css";
import { runGame } from "./renderEngine";

import Level from "./lib/Level";
import { groundLevel } from "./data/levels";
import DomDisplay from "./renderEngine/DomDisplay";

let simpleLevel = new Level(groundLevel);
const { startActors, rows } = simpleLevel;
console.log(startActors, rows);
let display = new DomDisplay(document.body, simpleLevel);

runGame(simpleLevel, display);
