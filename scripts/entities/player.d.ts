import { Entity } from "./entity";
import { XY } from "../tools";
export declare class Player extends Entity {
    private animationcounter;
    constructor(ctx: CanvasRenderingContext2D, x: any, y: any);
    static getApproxXY(xy: XY): XY;
    private static getApproxX;
    private static getApproxY;
    drawSprite(x: any, y: any): void;
    getDestinationX(x: number): number;
    getDestinationY(y: number): number;
    getMoveSprite(dir: any): any;
    toString(): string;
}
