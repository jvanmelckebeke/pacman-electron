const Game = require('./game').Game;
const log = require('electron-log');
let game;
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
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 1, 0, 1, 1, 1],
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
const cy = 40, cx = 40;
let currscore = 0;
let points = [], enemies = [];
let player, canvas, ctx;
const movespeed = 10;
const pwidth = 26, pheight = 30;
const ewidth = 26, eheight = 26;
let animationcounter = 0;
window.grid = map;
window.gridWidth = map[0].length;
window.gridHeight = map.length;
let PathFinder = require('./algorithms/asearch');
let pathFinder = PathFinder.PathFinder(map, map[0].length, map.length);
let helpervar = 0;
const pacmanmove = {
    right: ['./assets/PCMove/PCMove-Right-1.png', './assets/PCMove/PCMove-Right-2.png'],
    up: ['./assets/PCMove/PCMove-Up-1.png', "./assets/PCMove/PCMove-Up-2.png"],
    down: ['./assets/PCMove/PCMove-Down-1.png', "./assets/PCMove/PCMove-Down-2.png"],
    left: ['./assets/PCMove/PCMove-Left-1.png', "./assets/PCMove/PCMove-Left-2.png"],
};
const enemymove = {
    right: './assets/ENMove/Enemy-Right.png',
    up: './assets/ENMove/Enemy-Up.png',
    down: './assets/ENMove/Enemy-Down.png',
    left: './assets/ENMove/Enemy-Left.png',
};


function huntPlayer(x, y, enemy) {
    findpathtopacman(x, y, (path) => {
        log.info('path', path);
        let nextstep = path[path.length - 1];
        log.debug('nextstep', nextstep);
        let diff = {x: x - nextstep.x, y: y - nextstep.y};
        let nloc = {x: nextstep.x * cx, y: nextstep.y * cy};
        let movedir = null;
        if (diff === {x: -1, y: 0}) movedir = 'left';
        else if (diff === {x: 1, y: 0}) movedir = 'right';
        else if (diff === {x: 0, y: -1}) movedir = 'up';
        else if (diff === {x: 0, y: 1}) movedir = 'down';
        enemy.x = x;
        enemy.y = y;
        enemy.src = enemymove[movedir];
        makeSmallMove();

        function makeSmallMove() {
            log.info('enemy', enemy);
            ctx.clearRect(enemy.x * cx, enemy.y * cy, ewidth, eheight);
            enemy.src = enemymove[movedir];
            enemy.y += diff.y;
            enemy.x += diff.x;
            enemy.onload = () => ctx.drawImage(enemy, enemy.x, enemy.y, ewidth, eheight);
            // if (!(enemy.x === nloc.x && enemy.y === nloc.y)) setTimeout(makeSmallMove, 5000);
            // else findpathtopacman(nloc.x, nloc.y, enemy);
        }

    });
}

let images = {
    point: (ctx, x, y) => {
        let point = new Image();
        point.src = './assets/pacdot.png';
        point.onload = () => ctx.drawImage(point, x * cx + cx / 2, y * cy + cy / 2, 10, 10);
        points.push({x: x, y: y, point: point});
    },
    pacman: (ctx, x, y) => {
        let pacman = new Image();
        pacman.src = pacmanmove.right[0];
        pacman.onload = () =>
            ctx.drawImage(pacman, x * cx + cx / 2 - pwidth / 2, y * cy + cy / 2 - pheight / 2, pwidth, pheight);
        player = {x: x * cx, y: y * cy, pacman: pacman};
    },
    enemy: (ctx, x, y) => {
        let enemy = new Image();
        enemy.src = enemymove.left;
        enemy.onload = () => {
            setTimeout(() => huntPlayer(x, y, enemy), 5000);
            ctx.drawImage(enemy.clone(), x * cx + cx / 2 - ewidth / 2, y * cy + cy / 2 - eheight / 2, ewidth, eheight);
        };
        enemies.push({x: x * cx, y: y * cy, enemy: enemy, active: false});
    }
};


function findpathtopacman(currx, curry, callback) {
    let targetx = Math.round(player.x / cx), targety = Math.round(player.y / cy);
    log.info('realcoordinates: ', {x: currx, y: curry});
    log.info('targetcoordinates:', {x: targetx, y: targety});
    pathFinder.searchPath({x: currx, y: curry}, {x: targetx, y: targety}, callback);
}

module.exports = {
    points: points,
    score: () => game.score,
    pause: () => {
    },
    unpause: () => {
    },
    generatefield: () => {
        game = new Game();
    },
    move: (movedir) => {
        game.movePlayer(movedir);

    },
    cycle: () => {
        game.editScore();
        game.moveEnemies();
        return (game.evaluateGameOver())
    },
    trainAI: (win) => {game.trainAI(win)}
};