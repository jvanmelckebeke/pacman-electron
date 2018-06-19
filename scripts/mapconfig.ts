const path = require('path');
const movespeed = 10;
const pwidth = 26, pheight = 30;
const ewidth = 26, eheight = 26;
const gridx = 40, gridy = 40;

const basedir = '/home/jari/bitbucket/random-huge/pacman/';

function getp(d) {
    return path.resolve(basedir + d);
}

const pacmanmove = {
    right: [getp('./assets/PCMove/PCMove-Right-1.png'), getp('./assets/PCMove/PCMove-Right-2.png')],
    up: [getp('./assets/PCMove/PCMove-Up-1.png'), getp("./assets/PCMove/PCMove-Up-2.png")],
    down: [getp('./assets/PCMove/PCMove-Down-1.png'), getp("./assets/PCMove/PCMove-Down-2.png")],
    left: [getp('./assets/PCMove/PCMove-Left-1.png'), getp("./assets/PCMove/PCMove-Left-2.png")],
};
const enemymove = {
    right: getp('./assets/ENMove/Enemy-Right.png'),
    up: getp('./assets/ENMove/Enemy-Up.png'),
    down: getp('./assets/ENMove/Enemy-Down.png'),
    left: getp('./assets/ENMove/Enemy-Left.png'),
};
export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

const map = [
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


export const config = {
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

export function isValidMapPlace(x: number, y: number) {
    return x >= 0 && y >= 0 && x < map[0].length && y < map.length && map[y][x] != 0;
}