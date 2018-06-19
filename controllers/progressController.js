"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var ipcRenderer = electron.ipcRenderer;
var ProgressController = (function () {
    function ProgressController() {
        var _this = this;
        this.maxprogress = 100;
        this._progress = 0;
        this._accuracy = 0;
        this.currentwindow = electron.remote.getCurrentWindow();
        this.update();
        ipcRenderer.on('newprogress', function (event, progress, accuracy) {
            _this.accuracy = Math.round(accuracy * 10) / 10;
            _this.progress = progress;
            _this.update();
        });
    }
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
    ProgressController.prototype.update = function () {
        var t = document.getElementById('progresstext');
        var acc = document.getElementById('accuracytext');
        t.innerText = "epoch " + this.progress;
        acc.innerText = "accuracity: " + this._accuracy + "%";
        if (this._accuracy > 90) {
            this.currentwindow.close();
        }
    };
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
    return ProgressController;
}());
exports.ProgressController = ProgressController;
//# sourceMappingURL=progressController.js.map