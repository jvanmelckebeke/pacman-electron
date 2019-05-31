import { PathFinding } from "./pathfinding";
import { Enemy } from "../../entities/enemy";
import { Player } from "../../entities/player";
export declare class PathfindingHard extends PathFinding {
    constructor(grid: number[][]);
    setup(win: any): void;
    determineMove(enemy: Enemy, player: Player): string;
    private getCorrectAction;
}
