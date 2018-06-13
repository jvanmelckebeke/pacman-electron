"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
function indexController() {
    var electron = require('electron');
    var console = electron.remote.getGlobal('console');
    var BrowserWindow = electron.remote.BrowserWindow;
    var currentWindow = electron.remote.getCurrentWindow();
    var newgamebutton = document.getElementById('newgamebutton');
    var quitbutton = document.getElementById('quitbutton');
    var continuebutton = document.getElementById('continuegamebutton');
    var keep = { gameWindow: null };
    continuebutton.addEventListener('click', function (event) {
        keep.gameWindow.show();
        keep.gameWindow.requestFullscreen();
    });
    newgamebutton.addEventListener('click', function (event) {
        if (keep.gameWindow != null) {
            keep.gameWindow = null;
        }
        currentWindow.hide();
        keep.gameWindow = new BrowserWindow({
            width: 960, height: 540,
            fullscreen: true,
            autoHideMenuBar: true,
            webSecurity: false
        });
        keep.gameWindow.loadFile(path.resolve('views/game.html'));
        keep.gameWindow.on('close', function () {
            keep.gameWindow = null;
            currentWindow.show();
        });
        keep.gameWindow.on('closed', function () {
            keep.gameWindow = null;
            currentWindow.show();
        });
        keep.gameWindow.on('hide', function () {
            currentWindow.show();
        });
        keep.gameWindow.show();
    });
    quitbutton.addEventListener('click', function (event) {
        if (keep.gameWindow != null)
            keep.gameWindow.close();
        currentWindow.close();
    });
    currentWindow.on('show', function () {
        if (keep.gameWindow !== null) {
            document.getElementById('continuegamebutton').classList.remove('hidden');
        }
    });
}
exports.indexController = indexController;
//# sourceMappingURL=indexController.js.map