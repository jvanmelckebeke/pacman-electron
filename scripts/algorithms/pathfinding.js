"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathFinding = /** @class */ (function () {
    function PathFinding(grid) {
        this.movearr = ["up", "down", "left", "right"];
        this.grid = grid;
    }
    PathFinding.prototype.determineMove = function (enemy, player) {
        return this.movearr[Math.floor(Math.random() * this.movearr.length)];
    };
    return PathFinding;
}());
exports.PathFinding = PathFinding;
//# sourceMappingURL=pathfinding.js.map