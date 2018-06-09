"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("./mapconfig");
var player_1 = require("./entities/player");
var Point_1 = require("./entities/Point");
var enemy_1 = require("./entities/enemy");
var Game = /** @class */ (function () {
    function Game() {
        this.points = [];
        this.enemies = [];
        this.setup();
    }
    Game.prototype.setup = function () {
        this.generateMap();
    };
    Game.prototype.movePlayer = function (movedir) {
        console.log('player: ', this.player);
        this.player.move(movedir);
    };
    Game.prototype.generateMap = function () {
        console.log('map generating');
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "white";
        for (var y = 0; y < mapconfig_1.config.map.length; y++) {
            for (var x = 0; x < mapconfig_1.config.map[y].length; x++) {
                if (mapconfig_1.config.map[y][x] === 0) {
                    this.ctx.fillRect(x * mapconfig_1.config.grid.x, y * mapconfig_1.config.grid.y, mapconfig_1.config.grid.x, mapconfig_1.config.grid.y);
                }
                if (mapconfig_1.config.map[y][x] === 1) {
                    this.points.push(new Point_1.Point(this.ctx, x, y));
                }
                if (mapconfig_1.config.map[y][x] === 2) {
                    this.player = new player_1.Player(this.ctx, x, y);
                }
                if (mapconfig_1.config.map[y][x] === 3) {
                    this.enemies.push(new enemy_1.Enemy(this.ctx, x, y));
                }
            }
        }
        this.ctx.stroke();
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map