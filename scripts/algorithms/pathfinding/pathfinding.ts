import {Enemy} from "../../entities/enemy";
import {Player} from "../../entities/player";
import {isValidMapPlace} from "../../mapconfig";
import {calcBFS} from "../graphTraversal";
import {deepqlearn} from "convnetjs-ts";
import {Brain} from "convnetjs-ts/lib/deepqlearn";
import * as log from "electron-log";
import * as electron from 'electron';
import {getDirectionArray, XY} from "../../tools";

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
    private _grid: number[][];
    private _movearr = ["up", "down", "left", "right"];
    private _moveobj = getDirectionArray();
    private _MLset: boolean = false;
    private _brain: Brain;
    private _posreward = 10;
    private _negreward = -5;
    private _ctereward = 0.1;


    get posreward(): number {
        return this._posreward;
    }

    set posreward(value: number) {
        this._posreward = value;
    }

    get negreward(): number {
        return this._negreward;
    }

    set negreward(value: number) {
        this._negreward = value;
    }

    get ctereward(): number {
        return this._ctereward;
    }

    set ctereward(value: number) {
        this._ctereward = value;
    }

    constructor(grid: number[][]) {
        this._grid = grid;
    }


    get grid(): number[][] {
        return this._grid;
    }

    set grid(value: number[][]) {
        this._grid = value;
    }

    get movearr(): string[] {
        return this._movearr;
    }

    set movearr(value: string[]) {
        this._movearr = value;
    }

    get moveobj(): (XY | XY | XY | XY)[] {
        return this._moveobj;
    }

    set moveobj(value: (XY | XY | XY | XY)[]) {
        this._moveobj = value;
    }

    get MLset(): boolean {
        return this._MLset;
    }

    set MLset(value: boolean) {
        this._MLset = value;
    }

    get brain(): Brain {
        return this._brain;
    }

    set brain(value: Brain) {
        this._brain = value;
    }

    isCorrectDirection(action: number, state: number[]) {
        let dirPred = this.moveobj[action];
        let pxy = new XY(state[0], state[1]);
        let exy = new XY(state[2], state[3]);
        let nxy = exy.tAdd(dirPred);
        if (isValidMapPlace(nxy)) {
            //start bfs
            let best = calcBFS(exy, pxy), pred = calcBFS(exy, pxy);
            // log.info('best:', best, ' ; predicted: ', pred);
            return (best - 1 >= pred)
        }
        return false;
    }
}

