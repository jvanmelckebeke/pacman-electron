const path = require('path');

export function indexController() {
    const electron = require('electron');
    const console = electron.remote.getGlobal('console');

    const BrowserWindow = electron.remote.BrowserWindow;
    const currentWindow = electron.remote.getCurrentWindow();

    const newgamebutton = document.getElementById('newgamebutton');
    const quitbutton = document.getElementById('quitbutton');
    const continuebutton = document.getElementById('continuegamebutton');

    let keep = {gameWindow: null};

    continuebutton.addEventListener('click', event => {
        keep.gameWindow.show();
        keep.gameWindow.requestFullscreen();
    });

    newgamebutton.addEventListener('click', event => {

        if (keep.gameWindow != null) {
            keep.gameWindow = null;
        }
        currentWindow.hide();
        keep.gameWindow = new BrowserWindow(
            {
                width: 960, height: 540,
                fullscreen: true,
                autoHideMenuBar: true,
                webSecurity: false
            });
        keep.gameWindow.loadFile(path.resolve('views/game.html'));
        keep.gameWindow.on('close', () => {
            keep.gameWindow = null;
            currentWindow.show();
        });
        keep.gameWindow.on('closed', () => {
            keep.gameWindow = null;
            currentWindow.show();
        });
        keep.gameWindow.on('hide', () => {
            currentWindow.show();
        });
        keep.gameWindow.show();
    });

    quitbutton.addEventListener('click', event => {
        if (keep.gameWindow != null)
            keep.gameWindow.close();
        currentWindow.close();
    });

    currentWindow.on('show', () => {
        if (keep.gameWindow !== null) {
            document.getElementById('continuegamebutton').classList.remove('hidden');
        }
    })
}
