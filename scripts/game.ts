import {config} from "./mapconfig";
import {Player} from "./entities/player";
import {Point} from "./entities/point";
import {Enemy} from "./entities/enemy";
import {XY} from "./tools";
import * as log from "electron-log";
import {PathfindingHard} from "./algorithms/pathfinding/pathfindingHard";

export class Game {
    private canvas: any;
    private ctx: CanvasRenderingContext2D;
    private player: Player;
    private readonly points: Point[];
    private readonly enemies: Enemy[];
    private pathfinding: PathfindingHard;
    private readonly vis: XY[];

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
        this.score = 0;
        this.enemies = [];

        this.generateMap();

        this.pathfinding = new PathfindingHard(config.map);
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
        this.pathfinding.setup(win);
    }

    evaluateGameOver() {
        let pxy = this.player.gridXY;
        for (let enemy of this.enemies) {
            if (enemy.gridXY == pxy) {
                return true;
            }
        }
        return false;
    }

    editScore() {
        let pxy = this.player.gridXY;
        if (this.checked(pxy)) return;
        for (let point of this.points) {
            if (point.gridXY == pxy) {
                this._score++;
                break;
            }
        }
    }

    private checked(o: XY) {
        for (let xy of this.vis) {
            if (o == xy) return true;
        }
        this.vis.push(o);
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
    }


}