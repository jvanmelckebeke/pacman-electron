import {Enemy} from "../../entities/enemy";
import {Player} from "../../entities/player";
import {clone, isValidMapPlace} from "../../mapconfig";
import {calcBFS} from "../graphTraversal";
import {deepqlearn} from "convnetjs-ts";
import {Brain} from "convnetjs-ts/lib/deepqlearn";
import * as log from "electron-log";
import * as electron from 'electron';
import {getDirectionArray, XY} from "../../tools";
import {PathFinding} from "./pathfinding";

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

export class PathfindingEasy extends PathFinding {
    rewardsum = 0;
    lastrewards = [];
    rewardpercentage = 0;
    private streak: number;

    constructor(grid: number[][]) {
        super(grid);
    }

    createBrain(): Brain {
        let num_inputs = this.getNumberOfStates();
        let num_actions = 4;
        let temporal_window = 10; //todo: figure out this magic variable
        let network_size = num_inputs * temporal_window + num_actions * temporal_window + num_inputs;


        let layer_defs = [];

        layer_defs.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: network_size});
        layer_defs.push({type: 'fc', num_neurons: 100, activation: 'relu'});
        layer_defs.push({type: 'regression', num_neurons: num_actions});

        let tdtrainer_options = {learning_rate: 0.001, momentum: 0.0, batch_size: 64, l2_decay: 0.01};

        let opt = {
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

        return new deepqlearn.Brain(num_inputs, num_actions, opt);
    }

    setup(win) {
        let brain = this.createBrain();

        let reward = 0;

        for (let i = 0; i <= 200000; i++) {
            let state = this.getRandomState();

            let optimal = calcBFS(new XY(state[0], state[1]), new XY(state[2], state[3]));
            let action = brain.forward(state);
            reward = this.getReward(action, state, optimal, 1);
            brain.backward(reward);
            let chance = 1;
            // log.info('booo');
            while (reward < this.posreward) {
                if (reward >= 0)
                    state = this.modifyState(state, action);
                action = brain.forward(state);
                chance++;
                // log.info('moving to ', getDirectionArray()[action]);
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

    }

    determineMove(enemy: Enemy, player: Player): string {
        let state = [player.gridXY.x, player.gridXY.y, enemy.gridXY.x, enemy.gridXY.y].concat([].concat.apply([], this.grid));
        let action = this.brain.forward(state);
        return this.movearr[action];
    }

    private sendResult(epoch, reward: number, window) {
        this.lastrewards.push((reward == this.posreward) ? 1 : 0);

        if (this.lastrewards.length > 100) {
            this.lastrewards.splice(0, 1);
        }

        let rewardsum = 0;
        this.lastrewards.forEach(value => this.rewardsum += value);
        if (reward >= 90)
            this.streak++;
        else
            this.streak = 0;

        rewardsum += reward;
        this.rewardpercentage = rewardsum;
        window.webContents.send('newprogress', epoch, this.rewardpercentage, this.streak);
    }

    private modifyState(state: number[], action: number): number[] {
        let exy = new XY(state[2], state[3]);
        let axy = getDirectionArray()[action];
        exy.add(axy);
        state[2] = exy.x;
        state[3] = exy.y;
        return state;
    }

    private getReward(action, state, optimal: number, chance: number) {
        let pxy = new XY(state[0], state[1]);
        let exy = new XY(state[2], state[3]);
        let axy = getDirectionArray()[action];
        let cexy = new XY(exy.x + axy.x, exy.y + axy.y);
        if (!isValidMapPlace(cexy))
            return this.negreward;
        // log.info('pxy: ', pxy, 'exy: ', exy, 'axy: ', axy);
        if (exy.add(axy).is(pxy) && isValidMapPlace(exy)) {
            if (optimal === chance) return this.posreward;
            return this.posreward/chance;
        }
        return this.ctereward;
    }


    private getNumberOfStates() {
        return 4 + this.grid.length * this.grid[0].length;
    }

    private getRandomState() {
        return (getRandomValidXYs(this.grid)).concat([].concat.apply([], this.grid));
    }


}

