import {clone, isValidMapPlace} from "../mapconfig";
import * as log from 'electron-log';
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
        // log.info('queue', queue);
        let t = queue[0];
        queue.splice(0,1);
        if (t.x === tx && t.y == ty) {
            return t.val;
        }
        for (let xy of dxdy) {
            let c = clone(t);
            c.x += xy.x;
            c.y += xy.y;
            c.val++;
            if (isValidMapPlace(c.x, c.y) && notUsed(c)) {
                queue.push(c);
            }
        }
    }
    return -10;
}