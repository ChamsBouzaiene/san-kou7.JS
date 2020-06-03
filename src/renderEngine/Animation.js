export default class Animation {
  static timer = 0;

  static createAnimatable() {
    const animatable = document.createElement("span");
    animatable.innerHTML = "+1";
    animatable.classList.add("coin-collected");
    return animatable;
  }

  static collectedCoin(player) {
    player.appendChild(Animation.createAnimatable());
  }

  static cleanUP(player) {
    if (Array.from(player.children).length) {
      Animation.timer++;
    }
    console.log(Animation.timer);
    if (Animation.timer > 20 && Array.from(player.children).length) {
      const child = player.children;
      child[0].remove();
      Animation.timer = 0;
    } else if (Animation.timer > 20 && Animation.timer !== 0) {
      Animation.timer = 0;
    }
  }
}
