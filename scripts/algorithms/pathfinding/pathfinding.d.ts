import { Brain } from "convnetjs-ts/lib/deepqlearn";
import { XY } from "../../tools";
export declare class PathFinding {
    private _grid;
    private _movearr;
    private _moveobj;
    private _MLset;
    private _brain;
    private _posreward;
    private _negreward;
    private _ctereward;
    posreward: number;
    negreward: number;
    ctereward: number;
    constructor(grid: number[][]);
    grid: number[][];
    movearr: string[];
    moveobj: (XY | XY | XY | XY)[];
    MLset: boolean;
    brain: Brain;
    isCorrectDirection(action: number, state: number[]): boolean;
}
