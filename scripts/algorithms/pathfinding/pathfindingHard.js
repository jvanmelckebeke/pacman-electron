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
var pathfinding_1 = require("./pathfinding");
var log = require("electron-log");
var PathfindingHard = (function (_super) {
    __extends(PathfindingHard, _super);
    function PathfindingHard(grid) {
        return _super.call(this, grid) || this;
    }
    PathfindingHard.prototype.setup = function (win) {
        win.webContents.send('newprogress', 0, 100, 100);
        log.info('TRAINING DONE');
        win.close();
    };
    PathfindingHard.prototype.determineMove = function (enemy, player) {
        var state = [player.gridXY.x, player.gridXY.y, enemy.gridXY.x, enemy.gridXY.y].concat([].concat.apply([], this.grid));
        return this.getCorrectAction(state);
    };
    PathfindingHard.prototype.getCorrectAction = function (state) {
        for (var i = 0; i < 4; i++) {
            if (this.isCorrectDirection(i, state)) {
                return this.movearr[i];
            }
        }
        return this.movearr[0];
    };
    return PathfindingHard;
}(pathfinding_1.PathFinding));
exports.PathfindingHard = PathfindingHard;
//# sourceMappingURL=pathfindingHard.js.map