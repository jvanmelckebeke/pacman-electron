import {config} from "./mapconfig";
import {Player} from "./entities/player";
import {Point} from "./entities/Point";
import {Enemy} from "./entities/enemy";

export class Game {
    private canvas: any;
    private ctx: CanvasRenderingContext2D;
    private player: Player;
    private points: Point[];
    private enemies: Enemy[];

    constructor() {
        this.points = [];
        this.enemies = [];
        this.setup();
    }

    setup() {
        this.generateMap();
    }

    movePlayer(movedir){
        console.log('player: ', this.player);
        this.player.move(movedir);
    }

    private generateMap() {
        console.log('map generating');
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "white";
        for (let y = 0; y < config.map.length; y++) {
            for (let x = 0; x < config.map[y].length; x++) {
                if (config.map[y][x] === 0) {
                    this.ctx.fillRect(x * config.grid.x, y * config.grid.y, config.grid.x, config.grid.y);
                }
                if (config.map[y][x] === 1) {
                    this.points.push(new Point(this.ctx, x, y));
                }
                if (config.map[y][x] === 2) {
                    this.player = new Player(this.ctx, x, y);
                }
                if (config.map[y][x] === 3) {
                    this.enemies.push(new Enemy(this.ctx, x, y));
                }
            }
        }
        this.ctx.stroke();
    }
}