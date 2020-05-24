import Level from "../lib/Level";
import { runLevel } from "./lib";
import "regenerator-runtime/runtime";

export async function runGame(plans, Display) {
  let status;
  try {
    status = await runLevel(plans, Display);
  } catch (e) {
    console.error(e);
  }
  if (status == "won") return console.log("You've won!");
  console.log("You Lost");
}
