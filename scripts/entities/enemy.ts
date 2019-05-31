import {Entity} from "./entity";
import {config} from "../mapconfig";

export class Enemy extends Entity {
    prevmove: string;

    constructor(ctx, x, y) {
        super(ctx, x, y, config.entities.enemy.width, config.entities.enemy.height, config.moveSprites.enemy.right);
    }

    drawSprite(x, y) {
        this.ctx.drawImage(this.sprite, x, y,
            config.entities.player.width, config.entities.player.height);
    }

    getDestinationX(x: number) {
        return x * config.grid.x + config.grid.x / 2 - config.entities.enemy.width / 2;
    }

    getDestinationY(y: number) {
        return y * config.grid.y + config.grid.y / 2 - config.entities.enemy.height / 2;
    }

    getMoveSprite(dir) {
        return config.moveSprites.enemy[dir];
    }
}