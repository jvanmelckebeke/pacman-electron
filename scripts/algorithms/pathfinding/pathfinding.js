"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var tools_1 = require("../tools");
var ipc = electron.ipcRenderer;
var rewardpos = 50, rewardneg = -30;
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomValidXYs(grid) {
    while (true) {
        var py = randomIntFromInterval(0, grid.length - 1);
        var px = randomIntFromInterval(0, grid[0].length - 1);
        var ey = randomIntFromInterval(0, grid.length - 1);
        var ex = randomIntFromInterval(0, grid[0].length - 1);
        if (px !== ex && py !== ey && grid[py][px] !== 0 && grid[ey][ex] !== 0)
            return [px, py, ex, ey];
    }
}
var PathFinding = (function () {
    function PathFinding(grid) {
        this._movearr = ["up", "down", "left", "right"];
        this._moveobj = tools_1.getDirectionArray();
        this._MLset = false;
        this._grid = grid;
    }
    Object.defineProperty(PathFinding.prototype, "grid", {
        get: function () {
            return this._grid;
        },
        set: function (value) {
            this._grid = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathFinding.prototype, "movearr", {
        get: function () {
            return this._movearr;
        },
        set: function (value) {
            this._movearr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathFinding.prototype, "moveobj", {
        get: function () {
            return this._moveobj;
        },
        set: function (value) {
            this._moveobj = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathFinding.prototype, "MLset", {
        get: function () {
            return this._MLset;
        },
        set: function (value) {
            this._MLset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathFinding.prototype, "brain", {
        get: function () {
            return this._brain;
        },
        set: function (value) {
            this._brain = value;
        },
        enumerable: true,
        configurable: true
    });
    return PathFinding;
}());
exports.PathFinding = PathFinding;
//# sourceMappingURL=pathfinding.js.map