const Game = require('./game').Game;
const log = require('electron-log');
let game;

module.exports = {
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
    trainAI: (win) => {
        game.trainAI(win)
    }
};