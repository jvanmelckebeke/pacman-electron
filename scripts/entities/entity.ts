import {config} from "../mapconfig";

export class Entity {
    getDestinationY(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    getDestinationX(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    private _ctx: CanvasRenderingContext2D;
    private _sprite;
    private _gridX: number;
    private _gridY: number;
    private _canvasX: number;
    private _canvasY: number;

    constructor(ctx: CanvasRenderingContext2D, x, y, width, height, src) {
        this._ctx = ctx;

        this._sprite = new Image();
        this._sprite.src = src;

        this._sprite.onload = () =>
            ctx.drawImage(this._sprite, this.getDestinationX(x), this.getDestinationY(y),
                width, height);

        this._gridX = x;
        this._gridY = y;
        this._canvasX = this._gridX * config.grid.x;
        this._canvasY = this._gridY * config.grid.y;
    }


    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    set ctx(value: CanvasRenderingContext2D) {
        this._ctx = value;
    }

    get sprite() {
        return this._sprite;
    }

    set sprite(value) {
        this._sprite = value;
    }

    get gridX(): number {
        return this._gridX;
    }

    set gridX(value: number) {
        this._gridX = value;
    }

    get gridY(): number {
        return this._gridY;
    }

    set gridY(value: number) {
        this._gridY = value;
    }

    get canvasX(): number {
        return this._canvasX;
    }

    set canvasX(value: number) {
        this._canvasX = value;
    }

    get canvasY(): number {
        return this._canvasY;
    }

    set canvasY(value: number) {
        this._canvasY = value;
    }

    toString() {
        return JSON.stringify(this);
    }
}