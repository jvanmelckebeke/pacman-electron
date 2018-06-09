"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("../mapconfig");
var player_1 = require("./player");
var Entity = /** @class */ (function () {
    function Entity(ctx, x, y, width, height, src) {
        var _this = this;
        this._ctx = ctx;
        this._sprite = new Image();
        this._sprite.src = src;
        this._sprite.onload = function () {
            return ctx.drawImage(_this._sprite, _this.getDestinationX(x), _this.getDestinationY(y), width, height);
        };
        this._gridX = x;
        this._gridY = y;
        this._canvasX = this._gridX * mapconfig_1.config.grid.x;
        this._canvasY = this._gridY * mapconfig_1.config.grid.y;
    }
    Entity.prototype.getMoveSprite = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Entity.prototype.drawSprite = function (arg0, arg1) {
        throw new Error("Method not implemented.");
    };
    Entity.prototype.getDestinationY = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Entity.prototype.getDestinationX = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Entity.prototype.move = function (direction) {
        var _this = this;
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
        var approxX = player_1.Player.getApproxX(newX);
        var approxY = player_1.Player.getApproxY(newY);
        var oldGridX = this.gridX;
        var oldGridY = this.gridY;
        if (mapconfig_1.isValidMapPlace(approxX, approxY)) {
            requestAnimationFrame(function () {
                _this.sprite.onload = function () {
                    _this.ctx.clearRect((oldGridX * mapconfig_1.config.grid.x), (oldGridY * mapconfig_1.config.grid.y), mapconfig_1.config.grid.x, mapconfig_1.config.grid.y);
                    _this.drawSprite(_this.getDestinationX(approxX), _this.getDestinationY(approxY));
                };
                _this.sprite.src = _this.getMoveSprite(direction);
            });
            this.canvasX = newX;
            this.canvasY = newY;
            this.gridX = approxX;
            this.gridY = approxY;
        }
    };
    Object.defineProperty(Entity.prototype, "ctx", {
        get: function () {
            return this._ctx;
        },
        set: function (value) {
            this._ctx = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        set: function (value) {
            this._sprite = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "gridX", {
        get: function () {
            return this._gridX;
        },
        set: function (value) {
            this._gridX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "gridY", {
        get: function () {
            return this._gridY;
        },
        set: function (value) {
            this._gridY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "canvasX", {
        get: function () {
            return this._canvasX;
        },
        set: function (value) {
            this._canvasX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "canvasY", {
        get: function () {
            return this._canvasY;
        },
        set: function (value) {
            this._canvasY = value;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map