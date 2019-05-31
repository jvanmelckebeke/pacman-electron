import { Enemy } from "../../entities/enemy";
import { Player } from "../../entities/player";
import { Brain } from "convnetjs-ts/lib/deepqlearn";
import { PathFinding } from "./pathfinding";
export declare class PathfindingEasy extends PathFinding {
    rewardsum: number;
    lastrewards: any[];
    rewardpercentage: number;
    private streak;
    constructor(grid: number[][]);
    createBrain(): Brain;
    setup(win: any): void;
    determineMove(enemy: Enemy, player: Player): string;
    private sendResult;
    private modifyState;
    private getReward;
    private getNumberOfStates;
    private getRandomState;
}
