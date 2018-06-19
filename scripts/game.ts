import {config} from "./mapconfig";
import {Player} from "./entities/player";
import {Point} from "./entities/point";
import {Enemy} from "./entities/enemy";
import {PathFinding} from "./algorithms/pathfinding";

export class Game {
    private canvas: any;
    private ctx: CanvasRenderingContext2D;
    private player: Player;
    private points: Point[];
    private enemies: Enemy[];
    private pathfinding: PathFinding;
    private vis: { x: number, y: number }[];

    private _score: number;
    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }

    constructor() {
        this.vis = [];
        this.points = [];
        this._score = 0;
        this.enemies = [];
        this.generateMap();
        this.pathfinding = new PathFinding(config.map);
    }

    movePlayer(movedir) {
        this.player.move(movedir);
    }

    moveEnemies() {
        for (let enemy of this.enemies) {
            let nextmove;
            nextmove = this.pathfinding.determineMove(enemy, this.player);
            enemy.move(nextmove);
        }
    }

    trainAI(win) {
        this.pathfinding.setupML(win);
    }

    evaluateGameOver() {
        let px = this.player.gridX, py = this.player.gridY;
        for (let enemy of this.enemies) {
            if (enemy.gridX == px && enemy.gridY == py) {
                return true;
            }
        }
        return false;
    }

    editScore() {
        let px = this.player.gridX, py = this.player.gridY;
        if (this.checked(px, py)) return;
        for (let point of this.points) {
            if (point.gridX == px && point.gridY == py) {
                this._score++;
                break;
            }
        }
    }

    private checked(x: number, y: number) {
        for (let xy of this.vis) {
            if (xy.x == x && xy.y == y) return true;
        }
        this.vis.push({x: x, y: y});
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
                    setTimeout(() => this.enemies.push(new Enemy(this.ctx, x, y)), 1000);
                    setTimeout(() => this.enemies.push(new Enemy(this.ctx, x, y)), 3000);
                }
            }
        }
        this.ctx.stroke();
        return
    }


}