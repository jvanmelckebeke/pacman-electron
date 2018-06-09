import {Entity} from "./entity";
import {config} from "../mapconfig";

export class Enemy extends Entity {
    constructor(ctx, x, y) {
        super(ctx, x, y, config.entities.enemy.width, config.entities.enemy.height, config.moveSprites.enemy.right);
    }

    getDestinationX(x: number) {
        return x * config.grid.x + config.grid.x / 2 - config.entities.enemy.width / 2;
    }

    getDestinationY(y: number) {
        return y * config.grid.y + config.grid.y / 2 - config.entities.enemy.height / 2;
    }
}