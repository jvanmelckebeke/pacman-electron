"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("../mapconfig");
var entity_1 = require("./entity");
var animationcounter = 0;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(ctx, x, y) {
        return _super.call(this, ctx, x, y, mapconfig_1.config.entities.player.width, mapconfig_1.config.entities.player.height, mapconfig_1.config.moveSprites.pacman.right[0]) || this;
    }
    Player.prototype.move = function (direction) {
        var _this = this;
        animationcounter %= 2;
        var dx, dy;
        switch (direction) {
            case "up":
                dx = 0;
                dy = -mapconfig_1.config.speed;
                break;
            case "down":
                dx = 0;
                dy = mapconfig_1.config.speed;
                break;
            case "left":
                dx = -mapconfig_1.config.speed;
                dy = 0;
                break;
            case "right":
                dx = mapconfig_1.config.speed;
                dy = 0;
                break;
        }
        var newX = dx + this.canvasX;
        var newY = dy + this.canvasY;
        var approxX = this.getApproxX(newX);
        var approxY = this.getApproxY(newY);
        if (mapconfig_1.isValidMapPlace(approxX, approxY)) {
            requestAnimationFrame(function () {
                _this.sprite.onload = function () {
                    _this.ctx.clearRect(_this.getDestinationX(_this.gridX), _this.getDestinationY(_this.gridY), mapconfig_1.config.entities.player.width, mapconfig_1.config.entities.player.height);
                    _this.ctx.drawImage(_this.sprite, _this.getDestinationX(newX), _this.getDestinationY(newY), mapconfig_1.config.entities.player.width, mapconfig_1.config.entities.player.height);
                    console.log('this.sprite = ', _this.sprite);
                };
                _this.sprite.src = mapconfig_1.config.moveSprites.pacman[direction][animationcounter++];
            });
            this.canvasX = newX;
            this.canvasY = newY;
            this.gridX = approxX;
            this.gridY = approxY;
            console.log('moved');
        }
    };
    Player.prototype.getApproxX = function (x) {
        return Math.round(x / mapconfig_1.config.grid.x);
    };
    Player.prototype.getApproxY = function (y) {
        return Math.round(y / mapconfig_1.config.grid.y);
    };
    Player.prototype.getDestinationX = function (x) {
        return x * mapconfig_1.config.grid.x + mapconfig_1.config.grid.x / 2 - mapconfig_1.config.entities.player.width / 2;
    };
    Player.prototype.getDestinationY = function (y) {
        return y * mapconfig_1.config.grid.y + mapconfig_1.config.grid.y / 2 - mapconfig_1.config.entities.player.height / 2;
    };
    Player.prototype.toString = function () {
        return _super.prototype.toString.call(this);
    };
    return Player;
}(entity_1.Entity));
exports.Player = Player;
//# sourceMappingURL=player.js.map