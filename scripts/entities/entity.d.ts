export declare class Entity {
    getMoveSprite(arg0: any): any;
    drawSprite(arg0: any, arg1: any): any;
    getDestinationY(arg0: any): any;
    getDestinationX(arg0: any): any;
    private _ctx;
    private _sprite;
    private _gridX;
    private _gridY;
    private _canvasX;
    private _canvasY;
    constructor(ctx: CanvasRenderingContext2D, x: any, y: any, width: any, height: any, src: any);
    move(direction: string): boolean;
    ctx: CanvasRenderingContext2D;
    sprite: any;
    gridX: number;
    gridY: number;
    canvasX: number;
    canvasY: number;
    toString(): string;
}
