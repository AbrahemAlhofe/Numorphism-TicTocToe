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
})({"utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observer = exports.isFinished = exports.sum = exports.displayMatrix = exports.Players = void 0;

function getAcrossLeft(arr) {
  var i = -1;
  return arr.map(function (row) {
    i += 1;
    return row[i];
  });
}

function getAcrossRight(arr) {
  var i = 3;
  return arr.map(function (row) {
    i -= 1;
    return row[i];
  });
}

function getColumn(arr, col) {
  return arr.map(function (row) {
    return row[col - 1];
  });
}

var Players;

(function (Players) {
  Players[Players["GREEN"] = 1] = "GREEN";
  Players[Players["BLUE"] = -1] = "BLUE";
})(Players = exports.Players || (exports.Players = {}));

function displayMatrix(matrix) {
  var result = "";
  result += "[ " + matrix[0].join(", ") + " ]";
  result += "\n[ " + matrix[1].join(", ") + " ]";
  result += "\n[ " + matrix[2].join(", ") + " ]";
  console.log(result);
}

exports.displayMatrix = displayMatrix;

function sum(arr) {
  return arr.reduce(function (i, acc) {
    return i + acc;
  }, 0);
}

exports.sum = sum;

function isFinished(board) {
  var status = {
    winner: null
  };
  var sumColumns = [sum(getColumn(board, 0)), sum(getColumn(board, 1)), sum(getColumn(board, 2))];
  sumColumns.forEach(function (column) {
    if (column === Players.GREEN * 3) status.winner = Players.GREEN;
    if (column === Players.BLUE * 3) status.winner = Players.BLUE;
  });
  var sumRows = [sum(board[0]), sum(board[1]), sum(board[2])];
  sumRows.forEach(function (row) {
    if (row === Players.GREEN * 3) status.winner = Players.GREEN;
    if (row === Players.BLUE * 3) status.winner = Players.BLUE;
  });
  if (sum(getAcrossLeft(board)) === Players.GREEN * 3) status.winner = Players.GREEN;
  if (sum(getAcrossLeft(board)) === Players.BLUE * 3) status.winner = Players.GREEN;
  if (sum(getAcrossRight(board)) === Players.GREEN * 3) status.winner = Players.BLUE;
  if (sum(getAcrossRight(board)) === Players.BLUE * 3) status.winner = Players.BLUE;
  return status.winner !== null ? status : false;
}

exports.isFinished = isFinished;

var Observer =
/** @class */
function () {
  function Observer() {
    this.Observers = [];
  }

  Observer.prototype.fire = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    this.Observers.forEach(function (o) {
      return o.apply(void 0, args);
    });
  };

  Observer.prototype.listen = function (observer) {
    this.Observers.push(observer);
  };

  return Observer;
}();

exports.Observer = Observer;
},{}],"ai.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

console.log(utils_1.isFinished([[-1, 1, 1], [1, -1, 0], [0, 0, -1]]));

var Player =
/** @class */
function () {
  function Player(board) {
    this.board = board;
  }

  Player.prototype.play = function (controller) {
    var bestScore = -Infinity;
    var move = {
      row: 0,
      column: 0
    };

    for (var row = 0; row < 3; row += 1) {
      for (var column = 0; column < 3; column += 1) {
        if (this.board[row][column] == 0) {
          var score = minimax(this.board, 0, true);

          if (score > bestScore) {
            move = {
              row: row,
              column: column
            };
            bestScore = score;
          }
        }
      }
    }

    controller(move.row, move.column);
  };

  return Player;
}();

exports.default = Player;

function evaluate(board) {
  var $isFinished = utils_1.isFinished(board);

  if ($isFinished) {
    // If Game is finish and there is winner return score of it 10 of -10
    if (typeof $isFinished !== 'boolean') return $isFinished.winner === utils_1.Players.GREEN ? 10 : -10; // If Game is tieing return score 0

    return 0;
  }

  return null;
}

function minimax(board, depth, isMax) {
  // Get Score of move by passing screenshot from board
  var score = evaluate(board);
  if (score !== null) return score - depth;

  if (isMax) {
    var bestScore = -Infinity;

    for (var row = 0; row < 3; row += 1) {
      for (var column = 0; column < 3; column += 1) {
        // IF Spot is Available
        if (board[row][column] === 0) {
          board[row][column] = utils_1.Players.GREEN;
          bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
          board[row][column] = 0;
        }
      }
    }

    return bestScore;
  } else {
    var bestScore = Infinity;

    for (var row = 0; row < 3; row += 1) {
      for (var column = 0; column < 3; column += 1) {
        // IF Spot is Available
        if (board[row][column] === 0) {
          board[row][column] = utils_1.Players.BLUE;
          bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
          board[row][column] = 0;
        }
      }
    }

    return bestScore;
  }
}
},{"./utils":"utils.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ai_1 = __importDefault(require("./ai"));

var utils_1 = require("./utils");

var TicToc =
/** @class */
function (_super) {
  __extends(TicToc, _super);

  function TicToc() {
    var _a;

    var _this = _super.call(this) || this;

    _this.Matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    _this.Grid = Array.from(document.getElementsByClassName("box"));
    _this.currentPlayer = utils_1.Players.BLUE;
    _this.colors = (_a = {}, _a[utils_1.Players.BLUE] = "blue", _a[utils_1.Players.GREEN] = "green", _a);

    _this.Grid.forEach(function (box) {
      box.addEventListener("click", function () {
        // prevent user from click on the same time when ai thinking
        if (_this.currentPlayer !== utils_1.Players.BLUE) return;
        var row = Number(box.getAttribute("data-row"));
        var col = Number(box.getAttribute("data-col"));

        _this.play(row, col);

        var ai = new ai_1.default(_this.Matrix);
        ai.play(function (row, col) {
          return _this.play(row, col);
        });
      });
    });

    return _this;
  }

  TicToc.prototype.updateView = function () {
    var _this = this;

    this.Grid.forEach(function (box) {
      var row = Number(box.getAttribute("data-row"));
      var col = Number(box.getAttribute("data-col"));

      var feild = _this.Matrix[row][col].toString();

      if (_this.Matrix[row][col] !== 0) box.classList.add(_this.colors[feild]);else box.classList.remove(_this.colors[utils_1.Players.GREEN], _this.colors[utils_1.Players.BLUE]);
    });
  };

  TicToc.prototype.play = function (row, col) {
    if (utils_1.isFinished(this.Matrix)) return console.log("Game is finished"); // is patch available play on it

    if (this.Matrix[row][col] !== 0 && row >= 3 && col >= 3) return;
    this.Matrix[row][col] = this.currentPlayer; // Toggle Current Player

    this.currentPlayer = this.currentPlayer === utils_1.Players.GREEN ? utils_1.Players.BLUE : utils_1.Players.GREEN;
    this.updateView(); // fire event with array matrix, row and column

    this.fire(this.Matrix, {
      row: row,
      col: col
    });
  };

  return TicToc;
}(utils_1.Observer);

var tictoc = new TicToc();
var result = document.getElementById('result');
var reset = document.getElementById('reset');
tictoc.listen(function () {
  utils_1.displayMatrix(tictoc.Matrix);
  console.log(utils_1.isFinished(tictoc.Matrix));

  if (utils_1.isFinished(tictoc.Matrix)) {
    result.innerText = (tictoc.currentPlayer === utils_1.Players.GREEN ? 'blue' : 'green') + " player is winner";
  }
});
reset.addEventListener('click', function () {
  tictoc.Matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  tictoc.updateView();
  result.innerText = '';
  tictoc.currentPlayer = utils_1.Players.BLUE;
});
},{"./ai":"ai.ts","./utils":"utils.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56147" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map