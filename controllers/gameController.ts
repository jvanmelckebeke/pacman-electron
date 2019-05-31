import * as path from "path";
import * as log from "electron-log";
import * as electron from 'electron';

export function gameController() {
    let AItrained = false;
    let pause = false;

    function trainAI() {
        const BrowserWindow = electron.remote.BrowserWindow;

        let progressWindow = new BrowserWindow({
            width: 600, height: 100,
            fullscreen: false,
            autoHideMenuBar: true,
            frame: false
        });

        progressWindow.loadFile(path.resolve('views/progress.html'));
        progressWindow.on('close', () => {
            progressWindow = null;
            AItrained = true;
            cycle();
        });
        progressWindow.on('closed', () => {
            progressWindow = null;
            AItrained = true;
            cycle();
        });
        progressWindow.show();
        game.trainAI(progressWindow);
    }


    const game = require('../scripts/pacmangame');
    const BrowserWindow = electron.remote.BrowserWindow;

    let currentWindow = electron.remote.getCurrentWindow();
    document.onkeydown = (event) => {
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
        if (pause) return;
        if (game.cycle()) {
            alert("game over");
        } else {
            setTimeout(cycle, 250);
        }
    }

    setInterval(() => {
        return document.getElementById('score').innerText = `Score: ${game.score()}`;
    }, 500);
    currentWindow.on('hide', () => {
        pause = true;
    });
    currentWindow.on('show', () => {
        setTimeout(() => {
            pause = false;
            cycle();
        }, 3000);
    });
}