require("babel-core/register");
require("babel-polyfill");

import "./style/main.css";
import { runGame } from "./renderEngine";
import Menu from "./lib/Menu";
import GameControler from "./lib/GameController";
import Level from "./lib/Level";
import { groundLevel, groundLevel3 } from "./data/levels";
import DomDisplay from "./renderEngine/DomDisplay";

let simpleLevel = new Level(groundLevel3);
const { startActors, rows } = simpleLevel;
let display = new DomDisplay(document.body, simpleLevel);
let menu = new Menu("off");
let gameControler = new GameControler();
runGame(simpleLevel, display, menu, gameControler);
