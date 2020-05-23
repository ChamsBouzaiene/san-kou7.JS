import Level from "../lib/Level";

export async function runGame(plans, Display) {
  for (let level = 0; level < plans.length; ) {
    let status = await runLevel(new Level(plans[level]), Display);
    if (status === "won") level++;
  }
  console.log("You Have Won!");
}
