"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("../../mapconfig");
var graphTraversal_1 = require("../graphTraversal");
var convnetjs_ts_1 = require("convnetjs-ts");
var log = require("electron-log");
var electron = require("electron");
var tools_1 = require("../../tools");
var pathfinding_1 = require("./pathfinding");
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
var PathfindingEasy = (function (_super) {
    __extends(PathfindingEasy, _super);
    function PathfindingEasy(grid) {
        var _this = _super.call(this, grid) || this;
        _this.rewardsum = 0;
        _this.lastrewards = [];
        _this.rewardpercentage = 0;
        return _this;
    }
    PathfindingEasy.prototype.createBrain = function () {
        var num_inputs = this.getNumberOfStates();
        var num_actions = 4;
        var temporal_window = 10;
        var network_size = num_inputs * temporal_window + num_actions * temporal_window + num_inputs;
        var layer_defs = [];
        layer_defs.push({ type: 'input', out_sx: 1, out_sy: 1, out_depth: network_size });
        layer_defs.push({ type: 'fc', num_neurons: 100, activation: 'relu' });
        layer_defs.push({ type: 'regression', num_neurons: num_actions });
        var tdtrainer_options = { learning_rate: 0.001, momentum: 0.0, batch_size: 64, l2_decay: 0.01 };
        var opt = {
            temporal_window: temporal_window,
            experience_size: 200,
            start_learn_threshold: 1000000,
            gamma: 0.7,
            learning_steps_total: 200000,
            learning_steps_burnin: 500,
            epsilon_min: 0.05,
            epsilon_test_time: 0.05,
            layer_defs: layer_defs,
            tdtrainer_options: tdtrainer_options
        };
        return new convnetjs_ts_1.deepqlearn.Brain(num_inputs, num_actions, opt);
    };
    PathfindingEasy.prototype.setup = function (win) {
        var brain = this.createBrain();
        var reward = 0;
        for (var i = 0; i <= 200000; i++) {
            var state = this.getRandomState();
            var optimal = graphTraversal_1.calcBFS(new tools_1.XY(state[0], state[1]), new tools_1.XY(state[2], state[3]));
            var action = brain.forward(state);
            reward = this.getReward(action, state, optimal, 1);
            brain.backward(reward);
            var chance = 1;
            while (reward < this.posreward) {
                if (reward >= 0)
                    state = this.modifyState(state, action);
                action = brain.forward(state);
                chance++;
                reward = this.getReward(action, state, optimal, chance);
                brain.backward(reward);
                this.sendResult(i, reward, win);
            }
        }
        log.info('TRAINING DONE');
        brain.learning = false;
        brain.epsilon_test_time = 0;
        this.brain = brain;
        this.MLset = true;
    };
    PathfindingEasy.prototype.determineMove = function (enemy, player) {
        var state = [player.gridXY.x, player.gridXY.y, enemy.gridXY.x, enemy.gridXY.y].concat([].concat.apply([], this.grid));
        var action = this.brain.forward(state);
        return this.movearr[action];
    };
    PathfindingEasy.prototype.sendResult = function (epoch, reward, window) {
        var _this = this;
        this.lastrewards.push((reward == this.posreward) ? 1 : 0);
        if (this.lastrewards.length > 100) {
            this.lastrewards.splice(0, 1);
        }
        var rewardsum = 0;
        this.lastrewards.forEach(function (value) { return _this.rewardsum += value; });
        if (reward >= 90)
            this.streak++;
        else
            this.streak = 0;
        rewardsum += reward;
        this.rewardpercentage = rewardsum;
        window.webContents.send('newprogress', epoch, this.rewardpercentage, this.streak);
    };
    PathfindingEasy.prototype.modifyState = function (state, action) {
        var exy = new tools_1.XY(state[2], state[3]);
        var axy = tools_1.getDirectionArray()[action];
        exy.add(axy);
        state[2] = exy.x;
        state[3] = exy.y;
        return state;
    };
    PathfindingEasy.prototype.getReward = function (action, state, optimal, chance) {
        var pxy = new tools_1.XY(state[0], state[1]);
        var exy = new tools_1.XY(state[2], state[3]);
        var axy = tools_1.getDirectionArray()[action];
        var cexy = new tools_1.XY(exy.x + axy.x, exy.y + axy.y);
        if (!mapconfig_1.isValidMapPlace(cexy))
            return this.negreward;
        if (exy.add(axy).is(pxy) && mapconfig_1.isValidMapPlace(exy)) {
            if (optimal === chance)
                return this.posreward;
            return this.posreward / chance;
        }
        return this.ctereward;
    };
    PathfindingEasy.prototype.getNumberOfStates = function () {
        return 4 + this.grid.length * this.grid[0].length;
    };
    PathfindingEasy.prototype.getRandomState = function () {
        return (getRandomValidXYs(this.grid)).concat([].concat.apply([], this.grid));
    };
    return PathfindingEasy;
}(pathfinding_1.PathFinding));
exports.PathfindingEasy = PathfindingEasy;
//# sourceMappingURL=pathfindingEasy.js.map