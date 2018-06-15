"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var movespeed = 10;
var pwidth = 26, pheight = 30;
var ewidth = 26, eheight = 26;
var gridx = 40, gridy = 40;
var basedir = '/home/jari/bitbucket/random-huge/pacman/';
function getp(d) {
    return path.resolve(basedir + d);
}
var pacmanmove = {
    right: [getp('./assets/PCMove/PCMove-Right-1.png'), getp('./assets/PCMove/PCMove-Right-2.png')],
    up: [getp('./assets/PCMove/PCMove-Up-1.png'), getp("./assets/PCMove/PCMove-Up-2.png")],
    down: [getp('./assets/PCMove/PCMove-Down-1.png'), getp("./assets/PCMove/PCMove-Down-2.png")],
    left: [getp('./assets/PCMove/PCMove-Left-1.png'), getp("./assets/PCMove/PCMove-Left-2.png")],
};
var enemymove = {
    right: getp('./assets/ENMove/Enemy-Right.png'),
    up: getp('./assets/ENMove/Enemy-Up.png'),
    down: getp('./assets/ENMove/Enemy-Down.png'),
    left: getp('./assets/ENMove/Enemy-Left.png'),
};
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.clone = clone;
var map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
exports.config = {
    moveSprites: {
        pacman: pacmanmove,
        enemy: enemymove
    },
    map: map,
    grid: {
        x: gridx,
        y: gridy
    },
    speed: movespeed,
    entities: {
        enemy: {
            width: ewidth,
            height: eheight
        },
        player: {
            width: pwidth,
            height: pheight
        },
        point: {
            width: 20,
            height: 20
        }
    },
    sprites: {
        point: getp('./assets/pacdot.png')
    }
};
function isValidMapPlace(x, y) {
    return x >= 0 && y >= 0 && x < map[0].length && y < map.length && map[y][x] !== 0;
}
exports.isValidMapPlace = isValidMapPlace;
//# sourceMappingURL=mapconfig.js.map