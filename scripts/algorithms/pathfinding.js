"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("../mapconfig");
var graphTraversal_1 = require("./graphTraversal");
var electron = require("electron");
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
        this.movearr = ["up", "down", "left", "right"];
        this.moveobj = [{ y: -1, x: 0 }, { y: 1, x: 0 }, { y: 0, x: -1 }, { y: 0, x: 1 }];
        this.MLset = false;
        this.grid = grid;
    }
    PathFinding.prototype.setupML = function (win) {
        win.close();
        this.MLset = true;
    };
    PathFinding.prototype.getReward = function (action, state, grid) {
        var dirPred = this.moveobj[action];
        var px = state[0];
        var py = state[1];
        var ex = state[2];
        var ey = state[3];
        var nx = ex + dirPred.x;
        var ny = ey + dirPred.y;
        if (mapconfig_1.isValidMapPlace(nx, ny)) {
            var best = graphTraversal_1.calcBFS(ex, ey, px, py), pred = graphTraversal_1.calcBFS(nx, ny, px, py);
            return (best - 1 === pred) ? 1 : 0;
        }
        return 0;
    };
    PathFinding.prototype.getNumberOfStates = function () {
        return 4 + this.grid.length * this.grid[0].length;
    };
    PathFinding.prototype.getRandomState = function () {
        return (getRandomValidXYs(this.grid)).concat([].concat.apply([], this.grid));
    };
    PathFinding.prototype.determineMove = function (enemy, player) {
        var state = [player.gridX, player.gridY, enemy.gridX, enemy.gridY].concat([].concat.apply([], this.grid));
        return this.getCorrectAction(state);
    };
    PathFinding.prototype.getCorrectAction = function (state) {
        for (var i = 0; i < 4; i++) {
            if (this.getReward(i, state, this.grid) === 1) {
                return this.movearr[i];
            }
        }
        return this.movearr[0];
    };
    return PathFinding;
}());
exports.PathFinding = PathFinding;
//# sourceMappingURL=pathfinding.js.map