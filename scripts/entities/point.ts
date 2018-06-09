import {config} from "../mapconfig";
import {Entity} from "./entity";

export class Point extends Entity {
    constructor(ctx, x, y) {
        super(ctx, x, y, config.entities.point.width, config.entities.point.height, config.sprites.point);
    }

    getDestinationX(x: number) {
        return x * config.grid.x + config.grid.x / 2 - config.entities.point.width / 2;
    }

    getDestinationY(y: number) {
        return y * config.grid.y + config.grid.y / 2 - config.entities.point.height / 2;
    }
}

