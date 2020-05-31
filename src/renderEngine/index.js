import Level from "../lib/Level";
import { runLevel } from "./lib";

import "regenerator-runtime/runtime";

export async function runGame(plans, Display, Menu, gameControler) {
  let status;
  try {
    status = await runLevel(plans, Display, Menu, gameControler);
  } catch (e) {
    console.error(e);
  }
  if (status === "won") if (status === "lost");
}
