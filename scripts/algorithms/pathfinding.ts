import {Enemy} from "../entities/enemy";
import {Player} from "../entities/player";
import {isValidMapPlace} from "../mapconfig";
import {calcBFS} from "./graphTraversal";
import {deepqlearn} from "convnetjs-ts";
import {Brain} from "convnetjs-ts/lib/deepqlearn";
import * as log from "electron-log";
import * as electron from 'electron';

const ipc = electron.ipcRenderer;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomValidXYs(grid: number[][]) {
    while (true) {
        let py = randomIntFromInterval(0, grid.length - 1);
        let px = randomIntFromInterval(0, grid[0].length - 1);
        let ey = randomIntFromInterval(0, grid.length - 1);
        let ex = randomIntFromInterval(0, grid[0].length - 1);
        if (px !== ex && py !== ey && grid[py][px] !== 0 && grid[ey][ex] !== 0) return [px, py, ex, ey];
    }
}

export class PathFinding {
    private grid: number[][];
    private movearr = ["up", "down", "left", "right"];
    private moveobj = [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}];
    private MLset: boolean = false;
    private brain: Brain;

    constructor(grid: number[][]) {
        this.grid = grid;
    }

    setupML(win) {
        let numinputs = this.getNumberOfStates();
        let numactions = 4;
        let temporal_window = 1; //todo: figure out this magic variable
        let network_size = numinputs * temporal_window + numactions * temporal_window + numinputs;


        let layer_defs = [];

        layer_defs.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: network_size});
        layer_defs.push({type: 'fc', num_neurons: Math.round(network_size / 4), activation: 'relu'});
        layer_defs.push({type: 'fc', num_neurons: Math.round(network_size / 16), activation: 'relu'});
        layer_defs.push({type: 'regression', num_neurons: numactions});

        let tdtrainer_options = {learning_rate: 0.001, momentum: 0.01, batch_size: 64, l2_decay: 0.01};


        let opt = {
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

        let brain = new deepqlearn.Brain(numinputs, numactions, opt);

        let reward = 0;

        for (let i = 0; i <= 1e5 || reward < 1; i++) {
            let state = this.getRandomState();
            const action = brain.forward(state);
            reward = this.getReward(action, state, this.grid);
            // log.debug(`training epoch ${i} : ${reward}`);
            if (i % 100 == 0)
                win.webContents.send('newprogress', i);
            brain.backward(reward);
        }
        log.info('TRAINING DONE');
        this.brain = brain;
        this.MLset = true;

    }

    private getReward(action: number, state: number[], grid: number[][]) {
        let dirPred = this.moveobj[action];
        let px = state[0];
        let py = state[1];
        let ex = state[2];
        let ey = state[3];
        let nx = ex + dirPred.x;
        let ny = ey + dirPred.y;
        if (isValidMapPlace(nx, ny)) {
            //start bfs
            let best = calcBFS(ex, ey, px, py, grid), pred = calcBFS(nx, ny, px, py, grid);
            // log.info('best:', best, ' ; predicted: ', pred);
            return best - pred;
        }
        return -1;
    }

    private getNumberOfStates() {
        return 4 + this.grid.length * this.grid[0].length;
    }

    private getRandomState() {
        return (getRandomValidXYs(this.grid)).concat([].concat.apply([], this.grid));
    }

    determineMove(enemy: Enemy, player: Player): string {
        if (!this.MLset)
            return this.movearr[Math.floor(Math.random() * this.movearr.length)];
        else {
            return this.movearr[this.calcmove(enemy, player)];
        }
    }

    private calcmove(enemy: Enemy, player: Player) {
        // todo: make this better
        let state = [player.gridX, player.gridY, enemy.gridX, enemy.gridY].concat([].concat.apply([], this.grid));
        let action = this.brain.forward(state);
        this.brain.backward(this.getReward(action, state, this.grid));
        return action;
    }
}

