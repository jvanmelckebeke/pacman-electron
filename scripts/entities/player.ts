import {config, isValidMapPlace} from "../mapconfig";
import {Entity} from "./entity";

let animationcounter = 0;

export class Player extends Entity {

    constructor(ctx: CanvasRenderingContext2D, x, y) {
        super(ctx, x, y, config.entities.player.width, config.entities.player.height, config.moveSprites.pacman.right[0]);
    }

    move(direction: string) {
        animationcounter %= 2;
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
        let approxX = this.getApproxX(newX);
        let approxY = this.getApproxY(newY);

        if (isValidMapPlace(approxX, approxY)) {
            requestAnimationFrame(() => {
                this.sprite.onload = () => {
                    this.ctx.clearRect(this.getDestinationX(this.gridX), this.getDestinationY(this.gridY),
                        config.entities.player.width, config.entities.player.height);
                    this.ctx.drawImage(this.sprite, this.getDestinationX(newX), this.getDestinationY(newY),
                        config.entities.player.width, config.entities.player.height);
                    console.log('this.sprite = ', this.sprite);
                };
                this.sprite.src = config.moveSprites.pacman[direction][animationcounter++];
            });
            this.canvasX = newX;
            this.canvasY = newY;

            this.gridX = approxX;
            this.gridY = approxY;
            console.log('moved');
        }
    }

    getApproxX(x: number) {
        return Math.round(x / config.grid.x);
    }

    getApproxY(y: number) {
        return Math.round(y / config.grid.y);
    }

    getDestinationX(x: number) {
        return x * config.grid.x + config.grid.x / 2 - config.entities.player.width / 2;
    }

    getDestinationY(y: number) {
        return y * config.grid.y + config.grid.y / 2 - config.entities.player.height / 2;
    }


    toString(): string {
        return super.toString();
    }
}