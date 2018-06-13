import {isValidMapPlace} from "../mapconfig";

let used = [];

function notUsed(t: { x: number; y: number, val: number }) {
    for (let v of used) {
        if (v.x === t.x && v.y === t.y)
            return false;
    }
    used.push(t);
    return true;
}

export function calcBFS(sx: number, sy: number, tx: number, ty: number, grid: number[][]): number {
    used = [];
    let queue = [{x: sx, y: sy, val: 0}];
    let dxdy = [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}];
    while (queue.length > 0) {
        let t = queue.shift();
        if (t.x === tx && t.y == ty) {
            return t.val;
        }
        for (let xy of dxdy) {

            t.x += xy.x;
            t.y += xy.y;
            t.val++;
            if (isValidMapPlace(t.x, t.y) && notUsed(t)) {
                queue.push(t);
            }
        }
    }
    return 1;
}