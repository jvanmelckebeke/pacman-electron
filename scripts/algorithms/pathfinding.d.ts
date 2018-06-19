import { Enemy } from "../entities/enemy";
import { Player } from "../entities/player";
export declare class PathFinding {
    private grid;
    private movearr;
    private moveobj;
    private MLset;
    private brain;
    constructor(grid: number[][]);
    setupML(win: any): void;
    private getReward(action, state, grid);
    private getNumberOfStates();
    private getRandomState();
    determineMove(enemy: Enemy, player: Player): string;
    private getCorrectAction(state);
}
