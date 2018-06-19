import {config, isValidMapPlace} from "../mapconfig";
import {Player} from "./player";
import * as log from "electron-log";

export class Entity {
    getMoveSprite(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    drawSprite(arg0: any, arg1: any): any {
        throw new Error("Method not implemented.");
    }

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

    move(direction: string) {
        let dx, dy;
        switch (direction) {
            case "up":
                dx = 0;
                dy = -config.speed;
                break;
            case "down":
                dx = 0;
                dy = config.speed;
                break;
            case "left":
                dx = -config.speed;
                dy = 0;
                break;
            case "right":
                dx = config.speed;
                dy = 0;
                break;
        }
        let newX = dx + this.canvasX;
        let newY = dy + this.canvasY;

        let approxX = Player.getApproxX(newX);
        let approxY = Player.getApproxY(newY);

        let oldGridX = this.gridX;
        let oldGridY = this.gridY;

        if (isValidMapPlace(approxX, approxY)) {
            requestAnimationFrame(() => {
                this.sprite.onload = () => {
                    this.ctx.clearRect((oldGridX * config.grid.x), (oldGridY * config.grid.y),
                        config.grid.x, config.grid.y);
                    this.drawSprite(this.getDestinationX(approxX), this.getDestinationY(approxY));
                };
                this.sprite.src = this.getMoveSprite(direction);
            });
            this.canvasX = newX;
            this.canvasY = newY;
            this.gridX = approxX;
            this.gridY = approxY;
            return true;
        }
        log.info('not a valid place');
        return false;
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