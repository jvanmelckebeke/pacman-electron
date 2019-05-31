import { XY } from "../tools";
export declare class Entity {
    constructor(ctx: CanvasRenderingContext2D, x: any, y: any, width: any, height: any, src: any);
    private _gridXY;
    gridXY: XY;
    private _canvasXY;
    canvasXY: XY;
    private _ctx;
    ctx: CanvasRenderingContext2D;
    private _sprite;
    sprite: any;
    private static getDirection;
    getMoveSprite(arg0: any): any;
    drawSprite(arg0: any, arg1: any): any;
    getDestinationY(arg0: any): any;
    getDestinationX(arg0: any): any;
    move(direction: string): boolean;
    toString(): string;
}
