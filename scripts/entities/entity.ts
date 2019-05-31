import {config, isValidMapPlace} from "../mapconfig";
import {Player} from "./player";
import * as log from "electron-log";
import {XY} from "../tools";

export class Entity {
    constructor(ctx: CanvasRenderingContext2D, x, y, width, height, src) {
        this._ctx = ctx;

        this._sprite = new Image();
        this._sprite.src = src;

        this._sprite.onload = () =>
            ctx.drawImage(this._sprite, this.getDestinationX(x), this.getDestinationY(y),
                width, height);
        this._gridXY = new XY(x, y);
        this._canvasXY = new XY(this.gridXY.x, this.gridXY.y).multiply(config.grid.x, config.grid.y);
    }

    private _gridXY: XY;

    get gridXY(): XY {
        return this._gridXY;
    }

    set gridXY(value: XY) {
        this._gridXY = value;
    }

    private _canvasXY: XY;

    get canvasXY(): XY {
        return this._canvasXY;
    }

    set canvasXY(value: XY) {
        this._canvasXY = value;
    }

    private _ctx: CanvasRenderingContext2D;

    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    set ctx(value: CanvasRenderingContext2D) {
        this._ctx = value;
    }

    private _sprite;

    get sprite() {
        return this._sprite;
    }

    set sprite(value) {
        this._sprite = value;
    }

    private static getDirection(direction: string) {
        switch (direction) {
            case "up":
                return new XY(0, -config.speed);
            case "down":
                return new XY(0, config.speed);
            case "left":
                return new XY(-config.speed, 0);
            case "right":
                return new XY(config.speed, 0);
        }
        return new XY(0, 0);
    }

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

    move(direction: string) {
        let dxdy = Entity.getDirection(direction);

        let newXY = this.canvasXY.add(dxdy);
        let approxXY = Player.getApproxXY(newXY);

        let oldGridXY = this.gridXY;

        if (isValidMapPlace(approxXY)) {
            requestAnimationFrame(() => {
                this.sprite.onload = () => {
                    let newGridXY = oldGridXY.multiply(config.grid.x, config.grid.y);
                    this.ctx.clearRect(newGridXY.x, newGridXY.y, config.grid.x, config.grid.y);
                    this.drawSprite(this.getDestinationX(approxXY.x), this.getDestinationY(approxXY.y));
                };
                this.sprite.src = this.getMoveSprite(direction);
            });
            this.canvasXY = newXY;
            this.gridXY = approxXY;
            return true;
        }
        log.info('not a valid place');
        return false;
    }

    toString() {
        return JSON.stringify(this);
    }
}