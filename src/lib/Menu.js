export default class Menu {
  constructor(state) {
    this.state = state;
  }
  static updateMenuState(prevState, GameStae, keys) {
    return state;
  }
}

Menu.prototype.update = function (state, keys) {
  if (keys.Escape && state.status === "playing") {
    return new Menu("on");
  }
  // if ("keyEsc" && "state.status" === "palying") {
  //   updateState("pause");
  // }
  return new Menu("off");
};
