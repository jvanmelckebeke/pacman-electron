import {Enemy} from "../entities/enemy";
import {Player} from "../entities/player";
import {DQNSolver, DQNOpt, DQNEnv} from 'reinforce-js';
import {isValidMapPlace} from "../mapconfig";
import {calcBFS} from "./graphTraversal";


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
    private dqnSolver: DQNSolver;

    constructor(grid: number[][]) {
        this.grid = grid;
        this.setupML();
    }

    private setupML() {
        let env = new DQNEnv(100, 100, this.getNumberOfStates(), 4);
        let opt = new DQNOpt();
        opt.setTrainingMode(true);
        opt.setNumberOfHiddenUnits([100]);  // mind the array here
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
        this.dqnSolver = new DQNSolver(env, opt);
        for (let i = 0; i < 1000; i++) {
            let state = this.getRandomState();
            const action = this.dqnSolver.decide(state);
            let reward = this.getReward(action, state, this.grid);
            this.dqnSolver.learn(reward);
        }
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
            return calcBFS(ex, ey, px, py, grid) - calcBFS(nx, ny, px, py, grid);
        }
        return -100;
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
        return this.dqnSolver.decide([player.gridX, player.gridY, enemy.gridX, enemy.gridY].concat([].concat.apply([], this.grid)))
    }
}

