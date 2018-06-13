"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reinforce_js_1 = require("reinforce-js");
var mapconfig_1 = require("../mapconfig");
var graphTraversal_1 = require("./graphTraversal");
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
var PathFinding = /** @class */ (function () {
    function PathFinding(grid) {
        this.movearr = ["up", "down", "left", "right"];
        this.moveobj = [{ y: 1, x: 0 }, { y: -1, x: 0 }, { y: 0, x: -1 }, { y: 0, x: 1 }];
        this.MLset = false;
        this.grid = grid;
        this.setupML();
    }
    PathFinding.prototype.setupML = function () {
        var env = new reinforce_js_1.DQNEnv(100, 100, this.getNumberOfStates(), 4);
        var opt = new reinforce_js_1.DQNOpt();
        opt.setTrainingMode(true);
        opt.setNumberOfHiddenUnits([100]); // mind the array here
        opt.setEpsilonDecay(1.0, 0.1, 1e6);
        opt.setEpsilon(0.05);
        opt.setGamma(0.9);
        opt.setAlpha(0.005);
        opt.setLossClipping(true);
        opt.setLossClamp(1.0);
        opt.setRewardClipping(true);
        opt.setRewardClamp(1.0);
        opt.setExperienceSize(1e6);
        opt.setReplayInterval(5);
        opt.setReplaySteps(5);
        this.dqnSolver = new reinforce_js_1.DQNSolver(env, opt);
        for (var i = 0; i < 1000; i++) {
            var state = this.getRandomState();
            var action = this.dqnSolver.decide(state);
            var reward = this.getReward(action, state, this.grid);
            this.dqnSolver.learn(reward);
        }
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
            //start bfs
            return graphTraversal_1.calcBFS(ex, ey, px, py, grid) - graphTraversal_1.calcBFS(nx, ny, px, py, grid);
        }
        return -100;
    };
    PathFinding.prototype.getNumberOfStates = function () {
        return 4 + this.grid.length * this.grid[0].length;
    };
    PathFinding.prototype.getRandomState = function () {
        return (getRandomValidXYs(this.grid)).concat([].concat.apply([], this.grid));
    };
    PathFinding.prototype.determineMove = function (enemy, player) {
        if (!this.MLset)
            return this.movearr[Math.floor(Math.random() * this.movearr.length)];
        else {
            return this.movearr[this.calcmove(enemy, player)];
        }
    };
    PathFinding.prototype.calcmove = function (enemy, player) {
        // todo: make this better
        return this.dqnSolver.decide([player.gridX, player.gridY, enemy.gridX, enemy.gridY].concat([].concat.apply([], this.grid)));
    };
    return PathFinding;
}());
exports.PathFinding = PathFinding;
//# sourceMappingURL=pathfinding.js.map