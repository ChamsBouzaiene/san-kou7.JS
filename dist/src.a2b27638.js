// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/style/main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/lib/Vector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vec =
/*#__PURE__*/
function () {
  function Vec(x, y) {
    _classCallCheck(this, Vec);

    this.x = x;
    this.y = y;
  }

  _createClass(Vec, [{
    key: "plus",
    value: function plus(other) {
      return new Vec(this.x + other.x, this.y + other.y);
    }
  }, {
    key: "times",
    value: function times(factor) {
      return new Vec(this.x * factor, this.y * factor);
    }
  }]);

  return Vec;
}();

var _default = Vec;
exports.default = _default;
},{}],"src/lib/Lava.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Lava =
/*#__PURE__*/
function () {
  function Lava(pos, speed, reset) {
    _classCallCheck(this, Lava);

    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  _createClass(Lava, [{
    key: "type",
    get: function get() {
      return "Lava";
    }
  }], [{
    key: "create",
    value: function create(pos, ch) {
      if (ch === "=") {
        return new Lava(pos, new _Vector.default(2, 0));
      } else if (ch === "|") {
        return new Lava(pos, new _Vector.default(0, 2));
      } else if (ch === "V") {
        return new Lava(pos, new _Vector.default(0, 3), pos);
      }
    }
  }]);

  return Lava;
}();

Lava.prototype.size = new _Vector.default(1, 1);
var _default = Lava;
exports.default = _default;
},{"./Vector":"src/lib/Vector.js"}],"src/lib/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player =
/*#__PURE__*/
function () {
  function Player(pos, speed) {
    _classCallCheck(this, Player);

    this.pos = pos;
    this.speed = speed;
  }

  _createClass(Player, [{
    key: "type",
    get: function get() {
      return "player";
    }
  }], [{
    key: "create",
    value: function create(pos) {
      return new Player(pos.plus(new _Vector.default(0, -0.5)), new _Vector.default(0, 0));
    }
  }]);

  return Player;
}();

Player.prototype.size = new _Vector.default(0.8, 1.5);
var _default = Player;
exports.default = _default;
},{"./Vector":"src/lib/Vector.js"}],"src/lib/Coin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Coin =
/*#__PURE__*/
function () {
  function Coin(pos, basePos, wobble) {
    _classCallCheck(this, Coin);

    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  _createClass(Coin, [{
    key: "type",
    get: function get() {
      return "coin";
    }
  }], [{
    key: "create",
    value: function create(pos) {
      var basePos = pos.plus(new _Vector.default(0.2, 0.1));
      return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }
  }]);

  return Coin;
}();

Coin.prototype.size = new _Vector.default(0.6, 0.6);
var _default = Coin;
exports.default = _default;
},{"./Vector":"src/lib/Vector.js"}],"src/data/levels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelChars = exports.groundLevel = void 0;

var _Lava = _interopRequireDefault(require("../lib/Lava"));

var _Player = _interopRequireDefault(require("../lib/Player"));

var _Coin = _interopRequireDefault(require("../lib/Coin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groundLevel = "\n......................\n..#................#..\n..#..............=.#..\n..#.........o.o....#..\n..#.@......#####...#..\n..#####............#..\n......#++++++++++++#..\n......##############..\n......................";
exports.groundLevel = groundLevel;
var levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": _Player.default,
  o: _Coin.default,
  "=": _Lava.default,
  "|": _Lava.default,
  v: _Lava.default
};
exports.levelChars = levelChars;
},{"../lib/Lava":"src/lib/Lava.js","../lib/Player":"src/lib/Player.js","../lib/Coin":"src/lib/Coin.js"}],"src/lib/Level.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vector = _interopRequireDefault(require("./Vector"));

var _levels = require("../data/levels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function Level(plan) {
  var _this = this;

  _classCallCheck(this, Level);

  var rows = plan.trim().split("\n").map(function (l) {
    return _toConsumableArray(l);
  });
  this.height = rows.length;
  this.width = rows[0].length;
  this.startActors = [];
  this.rows = rows.map(function (row, y) {
    return row.map(function (ch, x) {
      var type = _levels.levelChars[ch];
      console.log(ch);
      if (typeof type == "string") return type;
      console.log(type);

      _this.startActors.push(type.create(new _Vector.default(x, y), ch));

      return "empty";
    });
  });
};

var _default = Level;
exports.default = _default;
},{"./Vector":"src/lib/Vector.js","../data/levels":"src/data/levels.js"}],"src/lib/State.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var State =
/*#__PURE__*/
function () {
  function State(level, actors, status) {
    _classCallCheck(this, State);

    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  _createClass(State, [{
    key: "player",
    get: function get() {
      return this.actors.find(function (a) {
        return a.type === "player";
      });
    }
  }], [{
    key: "start",
    value: function start(level) {
      return new State(level, level.startActors, "playing");
    }
  }]);

  return State;
}();

var _default = State;
exports.default = _default;
},{}],"src/renderEngine/lib.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawGrid = drawGrid;
exports.drawActors = drawActors;
exports.createNode = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var createNode = function createNode(name, attrs) {
  console.log(name, attrs);
  var node = document.createElement(name);

  for (var _i = 0, _Object$keys = Object.keys(attrs); _i < _Object$keys.length; _i++) {
    var attr = _Object$keys[_i];
    console.log(attr, attrs[attr]);
    node.setAttribute(attr, attrs[attr]);
  }

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  for (var _i2 = 0, _children = children; _i2 < _children.length; _i2++) {
    var child = _children[_i2];
    node.appendChild(child);
  }

  return node;
};

exports.createNode = createNode;
var scale = 20;

function drawGrid(level) {
  return createNode.apply(void 0, ["table", {
    class: "background",
    style: "width: ".concat(level.width * scale, "px")
  }].concat(_toConsumableArray(level.rows.map(function (row) {
    return createNode.apply(void 0, ["tr", {
      style: "height: ".concat(scale, "px")
    }].concat(_toConsumableArray(row.map(function (type) {
      return createNode("td", {
        class: type
      });
    }))));
  }))));
}

function drawActors(actors) {
  return createNode.apply(void 0, ["div", {}].concat(_toConsumableArray(actors.map(function (actor) {
    var rect = createNode("div", {
      class: "actor " + actor.type
    });
    console.log(actor.size, "tttt");
    rect.style.width = "".concat(actor.size.x * scale, "px");
    rect.style.heigh = "".concat(actor.size.y * scale, "px");
    rect.style.left = "".concat(actor.pos.x * scale, "px");
    rect.style.top = "".concat(actor.size.y * scale, "px");
    return rect;
  }))));
}
},{}],"src/renderEngine/DomDisplay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lib = require("./lib");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var scale = 20;

var DomDisplay =
/*#__PURE__*/
function () {
  function DomDisplay(parent, level) {
    _classCallCheck(this, DomDisplay);

    this.dom = (0, _lib.createNode)("div", {
      class: "game"
    }, (0, _lib.drawGrid)(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  _createClass(DomDisplay, [{
    key: "clear",
    value: function clear() {
      this.dom.remove();
    }
  }]);

  return DomDisplay;
}();

DomDisplay.prototype.syncState = function (state) {
  if (this.actorLayer) this.actorLayer.remove();
  console.log(state.actors);
  this.actorLayer = (0, _lib.drawActors)(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = "game ".concat(state.status);
  this.scrollPlayerIntoView(state);
};

DomDisplay.prototype.scrollPlayerIntoView = function (state) {
  var width = this.dom.clientWidth;
  var height = this.dom.clientHeight;
  var margin = width / 3;
  var left = this.dom.scrolLeft;
  var top = this.dom.scrolTop;
  var bottom = top + height;
  var right = left + width;
  var player = state.player;
  var center = player.pos.plus(player.size.times(0.5).times(scale));

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }

  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};

var _default = DomDisplay;
exports.default = _default;
},{"./lib":"src/renderEngine/lib.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./style/main.css");

var _Level = _interopRequireDefault(require("./lib/Level"));

var _State = _interopRequireDefault(require("./lib/State"));

var _levels = require("./data/levels");

var _DomDisplay = _interopRequireDefault(require("./renderEngine/DomDisplay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simpleLevel = new _Level.default(_levels.groundLevel);
console.log("".concat(simpleLevel.width, " by ").concat(simpleLevel.height));
console.log(simpleLevel.rows);
var display = new _DomDisplay.default(document.body, simpleLevel);
console.log(simpleLevel.startActors);
display.syncState(_State.default.start(simpleLevel)); // → 22 by 9

console.log("hello world");
},{"./style/main.css":"src/style/main.css","./lib/Level":"src/lib/Level.js","./lib/State":"src/lib/State.js","./data/levels":"src/data/levels.js","./renderEngine/DomDisplay":"src/renderEngine/DomDisplay.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44031" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map