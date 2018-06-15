"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("../mapconfig");
var graphTraversal_1 = require("./graphTraversal");
var convnetjs_ts_1 = require("convnetjs-ts");
var log = require("electron-log");
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
        this.moveobj = [{ y: 1, x: 0 }, { y: -1, x: 0 }, { y: 0, x: -1 }, { y: 0, x: 1 }];
        this.MLset = false;
        this.grid = grid;
    }
    PathFinding.prototype.setupML = function (win) {
        var numinputs = this.getNumberOfStates();
        var numactions = 4;
        var temporal_window = 1;
        var network_size = numinputs * temporal_window + numactions * temporal_window + numinputs;
        var layer_defs = [];
        layer_defs.push({ type: 'input', out_sx: 1, out_sy: 1, out_depth: network_size });
        layer_defs.push({ type: 'fc', num_neurons: Math.round(network_size / 4), activation: 'relu' });
        layer_defs.push({ type: 'fc', num_neurons: Math.round(network_size / 16), activation: 'relu' });
        layer_defs.push({ type: 'regression', num_neurons: numactions });
        var tdtrainer_options = { learning_rate: 0.001, momentum: 0.01, batch_size: 64, l2_decay: 0.01 };
        var opt = {
            temporal_window: temporal_window,
            experience_size: 30000,
            start_learn_threshold: 1e5,
            gamma: 0.7,
            learning_steps_total: 1e3,
            learning_steps_burnin: 3000,
            epsilon_min: 0.05,
            epsilon_test_time: 0.05,
            layer_defs: layer_defs,
            tdtrainer_options: tdtrainer_options
        };
        var brain = new convnetjs_ts_1.deepqlearn.Brain(numinputs, numactions, opt);
        var reward = 0;
        for (var i = 0; i <= 1e5 || reward < 1; i++) {
            var state = this.getRandomState();
            var action = brain.forward(state);
            reward = this.getReward(action, state, this.grid);
            if (i % 100 == 0)
                win.webContents.send('newprogress', i);
            brain.backward(reward);
        }
        log.info('TRAINING DONE');
        this.brain = brain;
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
            var best = graphTraversal_1.calcBFS(ex, ey, px, py, grid), pred = graphTraversal_1.calcBFS(nx, ny, px, py, grid);
            return best - pred;
        }
        return -1;
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
        var state = [player.gridX, player.gridY, enemy.gridX, enemy.gridY].concat([].concat.apply([], this.grid));
        var action = this.brain.forward(state);
        this.brain.backward(this.getReward(action, state, this.grid));
        return action;
    };
    return PathFinding;
}());
exports.PathFinding = PathFinding;
//# sourceMappingURL=pathfinding.js.map