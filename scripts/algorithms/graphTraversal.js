"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapconfig_1 = require("../mapconfig");
var tools_1 = require("../tools");
var used = [];
function notUsed(t) {
    for (var _i = 0, used_1 = used; _i < used_1.length; _i++) {
        var v = used_1[_i];
        if (v.isXY(t))
            return false;
    }
    used.push(t);
    return true;
}
function calcBFS(sxy, txy) {
    used = [];
    var queue = [new tools_1.XYT(sxy.x, sxy.y, 0)];
    var dxdy = tools_1.getDirectionArray();
    while (queue.length > 0) {
        var t = queue[0];
        queue.splice(0, 1);
        if (txy.isXY(t)) {
            return t.value;
        }
        for (var _i = 0, dxdy_1 = dxdy; _i < dxdy_1.length; _i++) {
            var xy = dxdy_1[_i];
            var c = new tools_1.XYT(t.x, t.y, t.value).addNumbers(xy.x, xy.y);
            c.value++;
            if (mapconfig_1.isValidMapPlace(c) && notUsed(c)) {
                queue.push(c);
            }
        }
    }
    return -10;
}
exports.calcBFS = calcBFS;
//# sourceMappingURL=graphTraversal.js.map