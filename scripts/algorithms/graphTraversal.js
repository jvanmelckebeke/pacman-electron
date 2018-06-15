"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("../mapconfig");
var used = [];
function notUsed(t) {
    for (var _i = 0, used_1 = used; _i < used_1.length; _i++) {
        var v = used_1[_i];
        if (v.x === t.x && v.y === t.y)
            return false;
    }
    used.push(t);
    return true;
}
function calcBFS(sx, sy, tx, ty, grid) {
    used = [];
    var queue = [{ x: sx, y: sy, val: 0 }];
    var dxdy = [{ y: 1, x: 0 }, { y: -1, x: 0 }, { y: 0, x: -1 }, { y: 0, x: 1 }];
    while (queue.length > 0) {
        var t = queue[0];
        queue.splice(0, 1);
        if (t.x === tx && t.y == ty) {
            return t.val;
        }
        for (var _i = 0, dxdy_1 = dxdy; _i < dxdy_1.length; _i++) {
            var xy = dxdy_1[_i];
            var c = mapconfig_1.clone(t);
            c.x += xy.x;
            c.y += xy.y;
            c.val++;
            if (mapconfig_1.isValidMapPlace(c.x, c.y) && notUsed(c)) {
                queue.push(c);
            }
        }
    }
    return -10;
}
exports.calcBFS = calcBFS;
//# sourceMappingURL=graphTraversal.js.map