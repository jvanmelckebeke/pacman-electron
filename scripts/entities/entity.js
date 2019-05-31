"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("../mapconfig");
var player_1 = require("./player");
var log = require("electron-log");
var tools_1 = require("../tools");
var Entity = (function () {
    function Entity(ctx, x, y, width, height, src) {
        var _this = this;
        this._ctx = ctx;
        this._sprite = new Image();
        this._sprite.src = src;
        this._sprite.onload = function () {
            return ctx.drawImage(_this._sprite, _this.getDestinationX(x), _this.getDestinationY(y), width, height);
        };
        this._gridXY = new tools_1.XY(x, y);
        this._canvasXY = new tools_1.XY(this.gridXY.x, this.gridXY.y).multiply(mapconfig_1.config.grid.x, mapconfig_1.config.grid.y);
    }
    Object.defineProperty(Entity.prototype, "gridXY", {
        get: function () {
            return this._gridXY;
        },
        set: function (value) {
            this._gridXY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "canvasXY", {
        get: function () {
            return this._canvasXY;
        },
        set: function (value) {
            this._canvasXY = value;
        },
        enumerable: true,
        configurable: true
    });
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
    Entity.getDirection = function (direction) {
        switch (direction) {
            case "up":
                return new tools_1.XY(0, -mapconfig_1.config.speed);
            case "down":
                return new tools_1.XY(0, mapconfig_1.config.speed);
            case "left":
                return new tools_1.XY(-mapconfig_1.config.speed, 0);
            case "right":
                return new tools_1.XY(mapconfig_1.config.speed, 0);
        }
        return new tools_1.XY(0, 0);
    };
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
        var dxdy = Entity.getDirection(direction);
        var newXY = this.canvasXY.add(dxdy);
        var approxXY = player_1.Player.getApproxXY(newXY);
        var oldGridXY = this.gridXY;
        if (mapconfig_1.isValidMapPlace(approxXY)) {
            requestAnimationFrame(function () {
                _this.sprite.onload = function () {
                    var newGridXY = oldGridXY.multiply(mapconfig_1.config.grid.x, mapconfig_1.config.grid.y);
                    _this.ctx.clearRect(newGridXY.x, newGridXY.y, mapconfig_1.config.grid.x, mapconfig_1.config.grid.y);
                    _this.drawSprite(_this.getDestinationX(approxXY.x), _this.getDestinationY(approxXY.y));
                };
                _this.sprite.src = _this.getMoveSprite(direction);
            });
            this.canvasXY = newXY;
            this.gridXY = approxXY;
            return true;
        }
        log.info('not a valid place');
        return false;
    };
    Entity.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map