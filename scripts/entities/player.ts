import {config, isValidMapPlace} from "../mapconfig";
import {Entity} from "./entity";

const log = require('electron-log');
let animationcounter = 0;

export class Player extends Entity {
    private animationcounter: number = 0;

    constructor(ctx: CanvasRenderingContext2D, x, y) {
        super(ctx, x, y, config.entities.player.width, config.entities.player.height, config.moveSprites.pacman.right[0]);
    }

    static getApproxX(x: number) {
        return Math.round(x / config.grid.x);
    }

    static getApproxY(y: number) {
        return Math.round(y / config.grid.y);
    }

    getDestinationX(x: number) {
        return x * config.grid.x + config.grid.x / 2 - config.entities.player.width / 2;
    }

    getDestinationY(y: number) {
        return y * config.grid.y + config.grid.y / 2 - config.entities.player.height / 2;
    }

    drawSprite(x, y) {
        this.ctx.drawImage(this.sprite, x, y,
            config.entities.player.width, config.entities.player.height);
    }

    getMoveSprite(dir) {
        this.animationcounter %= 2;
        return config.moveSprites.pacman[dir][this.animationcounter++];
    }

    toString(): string {
        return super.toString();
    }
}