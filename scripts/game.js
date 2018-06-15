"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("./mapconfig");
var player_1 = require("./entities/player");
var point_1 = require("./entities/point");
var enemy_1 = require("./entities/enemy");
var pathfinding_1 = require("./algorithms/pathfinding");
var Game = (function () {
    function Game() {
        this.vis = [];
        this.points = [];
        this._score = 0;
        this.enemies = [];
        this.generateMap();
        this.pathfinding = new pathfinding_1.PathFinding(mapconfig_1.config.map);
    }
    Object.defineProperty(Game.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (value) {
            this._score = value;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.movePlayer = function (movedir) {
        this.player.move(movedir);
    };
    Game.prototype.moveEnemies = function () {
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var enemy = _a[_i];
            var nextmove = void 0;
            if (enemy.prevmove) {
                nextmove = enemy.prevmove;
            }
            else {
                nextmove = this.pathfinding.determineMove(enemy, this.player);
            }
            if (enemy.move(nextmove)) {
                enemy.prevmove = nextmove;
            }
            else {
                enemy.prevmove = this.pathfinding.determineMove(enemy, this.player);
            }
        }
    };
    Game.prototype.trainAI = function (win) {
        this.pathfinding.setupML(win);
    };
    Game.prototype.evaluateGameOver = function () {
        var px = this.player.gridX, py = this.player.gridY;
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (enemy.gridX == px && enemy.gridY == py) {
                return true;
            }
        }
        return false;
    };
    Game.prototype.editScore = function () {
        var px = this.player.gridX, py = this.player.gridY;
        if (this.checked(px, py))
            return;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.gridX == px && point.gridY == py) {
                this._score++;
                break;
            }
        }
    };
    Game.prototype.checked = function (x, y) {
        for (var _i = 0, _a = this.vis; _i < _a.length; _i++) {
            var xy = _a[_i];
            if (xy.x == x && xy.y == y)
                return true;
        }
        this.vis.push({ x: x, y: y });
    };
    Game.prototype.generateMap = function () {
        var _this = this;
        console.log('map generating');
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "white";
        var _loop_1 = function (y) {
            var _loop_2 = function (x) {
                if (mapconfig_1.config.map[y][x] === 0) {
                    this_1.ctx.fillRect(x * mapconfig_1.config.grid.x, y * mapconfig_1.config.grid.y, mapconfig_1.config.grid.x, mapconfig_1.config.grid.y);
                }
                if (mapconfig_1.config.map[y][x] === 1) {
                    this_1.points.push(new point_1.Point(this_1.ctx, x, y));
                }
                if (mapconfig_1.config.map[y][x] === 2) {
                    this_1.player = new player_1.Player(this_1.ctx, x, y);
                }
                if (mapconfig_1.config.map[y][x] === 3) {
                    this_1.enemies.push(new enemy_1.Enemy(this_1.ctx, x, y));
                    setTimeout(function () { return _this.enemies.push(new enemy_1.Enemy(_this.ctx, x, y)); }, 1000);
                    setTimeout(function () { return _this.enemies.push(new enemy_1.Enemy(_this.ctx, x, y)); }, 3000);
                }
            };
            for (var x = 0; x < mapconfig_1.config.map[y].length; x++) {
                _loop_2(x);
            }
        };
        var this_1 = this;
        for (var y = 0; y < mapconfig_1.config.map.length; y++) {
            _loop_1(y);
        }
        this.ctx.stroke();
        return;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map