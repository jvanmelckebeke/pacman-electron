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
var log = require('electron-log');
var animationcounter = 0;
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(ctx, x, y) {
        var _this = _super.call(this, ctx, x, y, mapconfig_1.config.entities.player.width, mapconfig_1.config.entities.player.height, mapconfig_1.config.moveSprites.pacman.right[0]) || this;
        _this.animationcounter = 0;
        return _this;
    }
    Player.getApproxX = function (x) {
        return Math.round(x / mapconfig_1.config.grid.x);
    };
    Player.getApproxY = function (y) {
        return Math.round(y / mapconfig_1.config.grid.y);
    };
    Player.prototype.getDestinationX = function (x) {
        return x * mapconfig_1.config.grid.x + mapconfig_1.config.grid.x / 2 - mapconfig_1.config.entities.player.width / 2;
    };
    Player.prototype.getDestinationY = function (y) {
        return y * mapconfig_1.config.grid.y + mapconfig_1.config.grid.y / 2 - mapconfig_1.config.entities.player.height / 2;
    };
    Player.prototype.drawSprite = function (x, y) {
        this.ctx.drawImage(this.sprite, x, y, mapconfig_1.config.entities.player.width, mapconfig_1.config.entities.player.height);
    };
    Player.prototype.getMoveSprite = function (dir) {
        this.animationcounter %= 2;
        return mapconfig_1.config.moveSprites.pacman[dir][this.animationcounter++];
    };
    Player.prototype.toString = function () {
        return _super.prototype.toString.call(this);
    };
    return Player;
}(entity_1.Entity));
exports.Player = Player;
//# sourceMappingURL=player.js.map