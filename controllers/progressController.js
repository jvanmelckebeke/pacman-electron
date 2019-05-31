"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var log = require("electron-log");
var ipcRenderer = electron.ipcRenderer;
var ProgressController = (function () {
    function ProgressController() {
        var _this = this;
        this._streak = 0;
        this._progress = 0;
        this._accuracy = 0;
        this.currentwindow = electron.remote.getCurrentWindow();
        this.update();
        ipcRenderer.on('newprogress', function (event, progress, accuracy, streak) {
            log.info('progress: ', progress);
            _this.accuracy = Math.round(accuracy * 10) / 10;
            _this.streak = streak;
            _this.progress = progress;
            _this.update();
        });
        document.onkeydown = function (event) {
            if (event.key === 'Escape') {
                console.log('going to menu-window');
                _this.currentwindow.close();
            }
        };
    }
    Object.defineProperty(ProgressController.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (value) {
            this._progress = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressController.prototype, "accuracy", {
        get: function () {
            return this._accuracy;
        },
        set: function (value) {
            this._accuracy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressController.prototype, "streak", {
        get: function () {
            return this._streak;
        },
        set: function (value) {
            this._streak = value;
        },
        enumerable: true,
        configurable: true
    });
    ProgressController.prototype.update = function () {
        var epochtext = document.getElementById('progresstext');
        var accuracytext = document.getElementById('accuracytext');
        var streaktext = document.getElementById('streaktext');
        epochtext.innerText = "epoch " + this.progress;
        accuracytext.innerText = "accuracity: " + this.accuracy + "%";
        streaktext.innerText = "streak: " + this.streak;
        if (this._accuracy > 90 && this.streak >= 10) {
            this.currentwindow.close();
        }
    };
    return ProgressController;
}());
exports.ProgressController = ProgressController;
//# sourceMappingURL=progressController.js.map