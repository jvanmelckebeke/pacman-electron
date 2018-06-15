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
var entity_1 = require("./entity");
var mapconfig_1 = require("../mapconfig");
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(ctx, x, y) {
        return _super.call(this, ctx, x, y, mapconfig_1.config.entities.enemy.width, mapconfig_1.config.entities.enemy.height, mapconfig_1.config.moveSprites.enemy.right) || this;
    }
    Enemy.prototype.drawSprite = function (x, y) {
        this.ctx.drawImage(this.sprite, x, y, mapconfig_1.config.entities.player.width, mapconfig_1.config.entities.player.height);
    };
    Enemy.prototype.getMoveSprite = function (dir) {
        return mapconfig_1.config.moveSprites.enemy[dir];
    };
    Enemy.prototype.getDestinationX = function (x) {
        return x * mapconfig_1.config.grid.x + mapconfig_1.config.grid.x / 2 - mapconfig_1.config.entities.enemy.width / 2;
    };
    Enemy.prototype.getDestinationY = function (y) {
        return y * mapconfig_1.config.grid.y + mapconfig_1.config.grid.y / 2 - mapconfig_1.config.entities.enemy.height / 2;
    };
    return Enemy;
}(entity_1.Entity));
exports.Enemy = Enemy;
//# sourceMappingURL=enemy.js.map