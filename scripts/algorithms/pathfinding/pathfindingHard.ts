import {PathFinding} from "./pathfinding";
import {deepqlearn} from "convnetjs-ts";
import * as log from "electron-log";
import {Enemy} from "../../entities/enemy";
import {Player} from "../../entities/player";

export class PathfindingHard extends PathFinding {
    constructor(grid: number[][]) {
        super(grid);
    }

    setup(win) {
        win.webContents.send('newprogress', 0, 100, 100);
        log.info('TRAINING DONE');
        win.close();
    }

    determineMove(enemy: Enemy, player: Player): string {
        let state = [player.gridXY.x, player.gridXY.y, enemy.gridXY.x, enemy.gridXY.y].concat([].concat.apply([], this.grid));
        return this.getCorrectAction(state);
    }

    private getCorrectAction(state: number[]) {
        for (let i = 0; i < 4; i++) {
            if (this.isCorrectDirection(i, state)) {
                // log.info(`enemy (${state[2]}, ${state[3]}): best move: ${this.movearr[i]}`);
                return this.movearr[i];
            }
        }
        return this.movearr[0];
    }
}