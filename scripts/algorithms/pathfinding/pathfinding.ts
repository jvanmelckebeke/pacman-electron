import {Enemy} from "../entities/enemy";
import {Player} from "../entities/player";
import {isValidMapPlace} from "../mapconfig";
import {calcBFS} from "./graphTraversal";
import {deepqlearn} from "convnetjs-ts";
import {Brain} from "convnetjs-ts/lib/deepqlearn";
import * as log from "electron-log";
import * as electron from 'electron';
import {getDirectionArray, XY} from "../tools";

const ipc = electron.ipcRenderer;
const rewardpos = 50, rewardneg = -30;

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
    private moveobj = getDirectionArray();
    private MLset: boolean = false;
    private brain: Brain;

    constructor(grid: number[][]) {
        this.grid = grid;
    }

    setupML(win) {
        log.info('boooo');
        let num_inputs = this.getNumberOfStates();
        let num_actions = 4;
        let temporal_window = 10; //todo: figure out this magic variable
        let network_size = num_inputs*temporal_window + num_actions*temporal_window + num_inputs;


        let layer_defs = [];

        layer_defs.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: network_size});
        layer_defs.push({type: 'fc', num_neurons: 100, activation: 'relu'});
        layer_defs.push({type: 'regression', num_neurons: num_actions});

        let tdtrainer_options = {learning_rate:0.001, momentum:0.0, batch_size:64, l2_decay:0.01};

        let opt = {
            temporal_window: temporal_window,
            experience_size: 30000,
            start_learn_threshold: 1000,
            gamma: 0.7,
            learning_steps_total: 200000,
            learning_steps_burnin: 750,
            epsilon_min: 0.05,
            epsilon_test_time: 0.05,
            layer_defs: layer_defs,
            tdtrainer_options: tdtrainer_options
        };

        let brain = new deepqlearn.Brain(num_inputs, num_actions, opt);
        let reward = 0;
        let rewardsum = 0;
        let lastrewards = [];
        let rewardpercentage = 0;

        let streak = 0;
        for (let i = 0; i <= 200000 || streak > 10; i++) {
            let state = this.getRandomState();
            log.debug('before forward');
            const action = brain.forward(state);
            log.debug('after forward');
            reward = this.getReward(action, state, this.grid);

            // log.info('brain', brain);
            log.debug(`training epoch ${i} : ${reward}`);
            log.debug(`before backward`);
            brain.backward(reward);
            log.debug(`after backward`);
            lastrewards.push((reward == rewardpos) ? 1 : 0);
            if (lastrewards.length > 100)
                lastrewards.splice(0, 1);
            rewardsum = 0;
            lastrewards.forEach(value => rewardsum += value);
            if (reward >= 90)
                streak++;
            else
                streak = 0;

            rewardsum += reward;
            rewardpercentage = rewardsum;
            win.webContents.send('newprogress', i, rewardpercentage, streak);
        }
        log.info('TRAINING DONE');
        brain.learning = false;
        brain.epsilon_test_time = 0;
        this.brain = brain;
        this.MLset = true;

    }

    determineMove(enemy: Enemy, player: Player): string {
        let state = [player.gridXY.x, player.gridXY.y, enemy.gridXY.x, enemy.gridXY.y].concat([].concat.apply([], this.grid));
        let action = this.brain.forward(state);
        log.debug('action:', action);
        let reward = this.getReward(action, state, this.grid);
        this.brain.backward(reward);
        return this.movearr[action];
    }

    private getReward(action: number, state: number[], grid: number[][]) {
        let dirPred = this.moveobj[action];
        let pxy = new XY(state[0], state[1]);
        let exy = new XY(state[2], state[3]);
        let nxy = exy.tAdd(dirPred);
        if (isValidMapPlace(nxy)) {
            //start bfs
            let best = calcBFS(exy, pxy), pred = calcBFS(exy, pxy);
            // log.info('best:', best, ' ; predicted: ', pred);
            return (best - 1 >= pred) ? rewardpos : rewardneg;
        }
        return rewardneg;
    }

    private getNumberOfStates() {
        return 4 + this.grid.length * this.grid[0].length;
    }

    private getRandomState() {
        return (getRandomValidXYs(this.grid)).concat([].concat.apply([], this.grid));
    }

    private getCorrectAction(state: number[]) {
        for (let i = 0; i < 4; i++) {
            if (this.getReward(i, state, this.grid) === 50) {
                // log.info(`enemy (${state[2]}, ${state[3]}): best move: ${this.movearr[i]}`);
                return this.movearr[i];
            }
        }
        return this.movearr[0];
    }
}

