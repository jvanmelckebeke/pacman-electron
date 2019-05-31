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
var XY = (function () {
    function XY(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(XY.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XY.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    XY.prototype.is = function (o) {
        return (this.x == o.x && this.y == o.y);
    };
    XY.prototype.toString = function () {
        return "XY(" + this.x + ", " + this.y + ")";
    };
    XY.prototype.add = function (dxdy) {
        this.x += dxdy.x;
        this.y += dxdy.y;
        return this;
    };
    XY.prototype.addNumbers = function (x, y) {
        return this.add(new XY(x, y));
    };
    XY.prototype.multiply = function (m1, m2) {
        this.x *= m1;
        this.y *= m2 | m1;
        return this;
    };
    XY.prototype.tAdd = function (dirPred) {
        return new XY(dirPred.x + this.x, dirPred.y + this.y);
    };
    XY.prototype.isXY = function (t) {
        return (this.x === t.x && this.y === t.y);
    };
    return XY;
}());
exports.XY = XY;
var XYT = (function (_super) {
    __extends(XYT, _super);
    function XYT(x, y, t) {
        var _this = _super.call(this, x, y) || this;
        _this.value = t;
        return _this;
    }
    Object.defineProperty(XYT.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    XYT.prototype.add = function (dxdy) {
        this.x += dxdy.x;
        this.y += dxdy.y;
        return this;
    };
    XYT.prototype.addNumbers = function (x, y) {
        return this.add(new XYT(x, y, 0));
    };
    XYT.prototype.is = function (o) {
        return (o.y === this.y && o.x === this.x && o.value === this.value);
    };
    XYT.prototype.toString = function () {
        return "XYT(" + this.x + ", " + this.y + ", " + this.value + ")";
    };
    return XYT;
}(XY));
exports.XYT = XYT;
function getDirectionArray() {
    return [new XY(0, -1), new XY(0, 1), new XY(-1, 0), new XY(1, 0)];
}
exports.getDirectionArray = getDirectionArray;
//# sourceMappingURL=tools.js.map