"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var log = require("electron-log");
var electron = require("electron");
function gameController() {
    var AItrained = false;
    var pause = false;
    function trainAI() {
        var BrowserWindow = electron.remote.BrowserWindow;
        var progressWindow = new BrowserWindow({
            width: 600, height: 100,
            fullscreen: false,
            autoHideMenuBar: true,
            frame: false
        });
        progressWindow.loadFile(path.resolve('views/progress.html'));
        progressWindow.on('close', function () {
            progressWindow = null;
            AItrained = true;
            cycle();
        });
        progressWindow.on('closed', function () {
            progressWindow = null;
            AItrained = true;
            cycle();
        });
        progressWindow.show();
        game.trainAI(progressWindow);
    }
    var game = require('../scripts/pacmangame');
    var BrowserWindow = electron.remote.BrowserWindow;
    var currentWindow = electron.remote.getCurrentWindow();
    document.onkeydown = function (event) {
        if (event.key === 'Escape') {
            log.info('going to menu-window');
            currentWindow.hide();
        }
        if (event.code === 'ArrowUp') {
            (game.move('up'));
        }
        if (event.code === 'ArrowDown') {
            (game.move('down'));
        }
        if (event.code === 'ArrowLeft') {
            (game.move('left'));
        }
        if (event.code === 'ArrowRight') {
            (game.move('right'));
        }
    };
    game.generatefield();
    if (!AItrained)
        trainAI();
    function cycle() {
        if (pause)
            return;
        if (game.cycle()) {
            alert("game over");
        }
        else {
            setTimeout(cycle, 250);
        }
    }
    setInterval(function () {
        return document.getElementById('score').innerText = "Score: " + game.score();
    }, 500);
    currentWindow.on('hide', function () {
        pause = true;
    });
    currentWindow.on('show', function () {
        setTimeout(function () {
            pause = false;
            cycle();
        }, 3000);
    });
}
exports.gameController = gameController;
//# sourceMappingURL=gameController.js.map