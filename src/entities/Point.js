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
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point(ctx, x, y) {
        return _super.call(this, ctx, x, y, mapconfig_1.config.entities.point.width, mapconfig_1.config.entities.point.height, mapconfig_1.config.sprites.point) || this;
    }
    Point.prototype.getDestinationX = function (x) {
        return x * mapconfig_1.config.grid.x + mapconfig_1.config.grid.x / 2 - mapconfig_1.config.entities.point.width / 2;
    };
    Point.prototype.getDestinationY = function (y) {
        return y * mapconfig_1.config.grid.y + mapconfig_1.config.grid.y / 2 - mapconfig_1.config.entities.point.height / 2;
    };
    return Point;
}(entity_1.Entity));
exports.Point = Point;
//# sourceMappingURL=Point.js.map