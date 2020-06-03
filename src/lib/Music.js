export default class Music {
  constructor() {
    this.tracks = [];
    this.track;
    this.bg = document.getElementById("myAudio");
    this.coin = document.getElementById("coin-sfx");
    this.bg.loop = true;
  }

  BgPlayer(state) {
    document.getElementById("myAudio").play();
    document.getElementById("myAudio").volume = 0.1;
    if (state) document.getElementById("myAudio").pause();
  }
  static playCoin() {
    document.getElementById("coin-sfx").play();
  }
  static walkPlayer() {
    document.getElementById("walk-sfx").play();
  }

  static winPlayer() {
    document.getElementById("win-sfx").play();
  }

  static jumpPlayer() {
    document.getElementById("jump-sfx").play();
  }

  static menuPlayer() {
    document.getElementById("menu-sfx").play();
  }

  static collidePlayer() {
    console.log("collided");
    document.getElementById("collide-sfx").play();
  }

  static lostplayer() {
    console.log("collided");
    document.getElementById("lose-sfx").play();
  }

  static idlePlayer() {
    document.getElementById("walk-sfx").loop = false;
    return document.getElementById("walk-sfx").pause();
  }

  play(track) {}
  pause(track) {}
  setTrack() {}
}
