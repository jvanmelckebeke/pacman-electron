import { Entity } from "./entity";
export declare class Enemy extends Entity {
    prevmove: string;
    constructor(ctx: any, x: any, y: any);
    drawSprite(x: any, y: any): void;
    getMoveSprite(dir: any): any;
    getDestinationX(x: number): number;
    getDestinationY(y: number): number;
}
