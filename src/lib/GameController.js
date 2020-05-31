export default class GameContoller {
  constructor(playing) {
    this.status = "playing";
    window.addEventListener("keydown", (event) => {
      if (event.key != "Escape") return;
      event.preventDefault();
      if (this.status == "paused") {
        this.setStatus("playing");
      } else if (this.status == "playing") {
        this.setStatus("paused");
      } else {
        this.setStatus("playing");
      }
    });
  }

  setStatus(newStatus) {
    this.status = newStatus;
  }
}

GameContoller.prototype.EscHandler = function (event) {
  if (event.key != "Escape") return;
  event.preventDefault();
  if (game.status == "paused") {
    game.setStatus("playing");
  } else if (game.status == "playing") {
    game.setStatus("paused");
  } else {
    game.setStatus("playing");
  }
};
