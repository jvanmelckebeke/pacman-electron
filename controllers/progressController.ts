import * as electron from 'electron';
import * as log from "electron-log";
import {BrowserWindow} from 'electron';

const ipcRenderer = electron.ipcRenderer;

export class ProgressController {
    maxprogress: number; // todo

    private _progress: number;
    private currentwindow: BrowserWindow;
    private _accuracy: number;

    get accuracy(): number {
        return this._accuracy;
    }

    set accuracy(value: number) {
        this._accuracy = value;
    }

    constructor() {
        this.maxprogress = 100;
        this._progress = 0;
        this._accuracy = 0;
        this.currentwindow = electron.remote.getCurrentWindow();
        this.update();
        ipcRenderer.on('newprogress', (event, progress, accuracy) => {
            // log.info('progress: ', progress);
            this.accuracy = Math.round(accuracy * 10) / 10;
            this.progress = progress;
            this.update();
        });
    }

    update() {
        let t = document.getElementById('progresstext');
        let acc = document.getElementById('accuracytext');
        t.innerText = `epoch ${this.progress}`;
        acc.innerText = `accuracity: ${this._accuracy}%`;
        if (this._accuracy > 90) {
            this.currentwindow.close();
        }
    }


    get progress(): number {
        return this._progress;
    }

    set progress(value: number) {
        this._progress = value;
    }
}