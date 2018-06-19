import { Entity } from "./entity";
export declare class Point extends Entity {
    constructor(ctx: any, x: any, y: any);
    getDestinationX(x: number): number;
    getDestinationY(y: number): number;
}
