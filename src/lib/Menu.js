export default class Menu {
  constructor(dispatcher) {
    this.dipatcher = dispatcher;
    window.addEventListener("click", (event) => {
      console.log("click", Menu.menuBtnsIds);
      if (!Menu.menuBtnsIds.includes(event.target.id)) return;
      if (event.target.id === "play") {
        return dispatcher.setStatus("playing");
      }
      if (event.target.id === "restart") {
        return document.location.reload();
      }
    });
  }

  static menuBtnsIds = ["play", "restart", "setting"];

  static updateMenuState(prevState, GameStae, keys) {
    return state;
  }

  static toggleMenu = (val) => {
    const menu = document.querySelector(".menu");
    if (val) return (menu.style.display = "flex");
    else {
      return (menu.style.display = "none");
    }
  };

  static setMenu = (title) => {
    if (title === "GAME OVER") {
      const menuTitle = document.querySelector(".status-title");
      console.log(menuTitle.style);
      menuTitle.innerHTML = title;
      menuTitle.classList.remove("status-title");
      menuTitle.classList.add("status-title-gameover");
      const menuBtn = document.getElementsByClassName("main-btn")[0];
      menuBtn.id = "restart";
      menuBtn.innerHTML = "RESTART";
    } else {
      const menuTitle = document.querySelector(".status-title");
      menuTitle.innerHTML = title;
    }

    Menu.toggleMenu(true);
  };

  static updateMenu = (status) => {
    if (status === "paused") {
      return Menu.setMenu("PAUSED");
    }
    if (status === "lost") {
      return Menu.setMenu("GAME OVER");
    } else {
      Menu.toggleMenu(false);
    }
  };
}

// Menu.prototype.update = function (state, keys) {
//   if (status === "playing") {
//     return new Menu("on");
//   }
//   return new Menu("off");
// };
