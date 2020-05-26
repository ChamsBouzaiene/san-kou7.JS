export default class Menu {
  constructor(state) {
    this.state = "playing" || state;
  }

  updateState(newState) {
    this.state = newState;
  }
}
