import { Entity } from "./entity";
export declare class Player extends Entity {
    private animationcounter;
    constructor(ctx: CanvasRenderingContext2D, x: any, y: any);
    static getApproxX(x: number): number;
    static getApproxY(y: number): number;
    getDestinationX(x: number): number;
    getDestinationY(y: number): number;
    drawSprite(x: any, y: any): void;
    getMoveSprite(dir: any): any;
    toString(): string;
}
