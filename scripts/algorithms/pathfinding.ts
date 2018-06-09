import {Enemy} from "../entities/enemy";
import {Player} from "../entities/player";

export class PathFinding {
    private grid: number[][];
    private movearr = ["up", "down", "left", "right"];

    constructor(grid: number[][]) {
        this.grid = grid;
    }

    determineMove(enemy: Enemy, player: Player): string {
        return this.movearr[Math.floor(Math.random() * this.movearr.length)];
    }
}