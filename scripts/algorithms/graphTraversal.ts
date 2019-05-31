import {clone, isValidMapPlace} from "../mapconfig";
import * as log from 'electron-log';
import {getDirectionArray, XY, XYT} from "../tools";

let used = [];

function notUsed(t: XYT) {
    for (let v of used) {
        if (v.isXY(t))
            return false;
    }
    used.push(t);
    return true;
}

export function calcBFS(sxy: XY, txy: XY): number {
    used = [];
    let queue = [new XYT(sxy.x, sxy.y, 0)];
    let dxdy = getDirectionArray();
    while (queue.length > 0) {
        let t = queue[0];
        queue.splice(0, 1);
        if (txy.isXY(t)) {
            return t.value;
        }
        for (let xy of dxdy) {
            let c = new XYT(t.x, t.y, t.value).addNumbers(xy.x, xy.y);
            c.value++;
            if (isValidMapPlace(c) && notUsed(c)) {
                queue.push(c);
            }
        }
    }
    return -10;
}