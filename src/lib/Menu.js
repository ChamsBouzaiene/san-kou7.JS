export default class Menu {
  constructor(state) {
    this.state = state;
  }
  static updateMenuState(prevState, GameStae, keys) {
    return state;
  }

  static appendMenu() {}
}

Menu.prototype.update = function (state, keys) {
  if (status === "playing") {
    return new Menu("on");
  }
  return new Menu("off");
};
