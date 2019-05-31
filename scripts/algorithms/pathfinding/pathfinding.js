"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("../../mapconfig");
var graphTraversal_1 = require("../graphTraversal");
var electron = require("electron");
var tools_1 = require("../../tools");
var ipc = electron.ipcRenderer;
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
        this._posreward = 10;
        this._negreward = -5;
        this._ctereward = 0.1;
        this._grid = grid;
    }
    Object.defineProperty(PathFinding.prototype, "posreward", {
        get: function () {
            return this._posreward;
        },
        set: function (value) {
            this._posreward = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathFinding.prototype, "negreward", {
        get: function () {
            return this._negreward;
        },
        set: function (value) {
            this._negreward = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathFinding.prototype, "ctereward", {
        get: function () {
            return this._ctereward;
        },
        set: function (value) {
            this._ctereward = value;
        },
        enumerable: true,
        configurable: true
    });
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
    PathFinding.prototype.isCorrectDirection = function (action, state) {
        var dirPred = this.moveobj[action];
        var pxy = new tools_1.XY(state[0], state[1]);
        var exy = new tools_1.XY(state[2], state[3]);
        var nxy = exy.tAdd(dirPred);
        if (mapconfig_1.isValidMapPlace(nxy)) {
            var best = graphTraversal_1.calcBFS(exy, pxy), pred = graphTraversal_1.calcBFS(exy, pxy);
            return (best - 1 >= pred);
        }
        return false;
    };
    return PathFinding;
}());
exports.PathFinding = PathFinding;
//# sourceMappingURL=pathfinding.js.map