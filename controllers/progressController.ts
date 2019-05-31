import * as electron from 'electron';
import * as log from "electron-log";
import {BrowserWindow} from 'electron';

const ipcRenderer = electron.ipcRenderer;

export class ProgressController {

    private currentwindow: BrowserWindow;

    constructor() {
        this._streak = 0;
        this._progress = 0;
        this._accuracy = 0;
        this.currentwindow = electron.remote.getCurrentWindow();
        this.update();
        ipcRenderer.on('newprogress', (event, progress, accuracy, streak) => {
            log.info('progress: ', progress);
            this.accuracy = Math.round(accuracy * 10) / 10;
            this.streak = streak;
            this.progress = progress;
            this.update();
        });
        document.onkeydown = (event) => {
            if (event.key === 'Escape') {
                console.log('going to menu-window');
                this.currentwindow.close();
            }
        };
    }

    private _progress: number;

    get progress(): number {
        return this._progress;
    }

    set progress(value: number) {
        this._progress = value;
    }

    private _accuracy: number;

    get accuracy(): number {
        return this._accuracy;
    }

    set accuracy(value: number) {
        this._accuracy = value;
    }

    private _streak: number;

    get streak(): number {
        return this._streak;
    }

    set streak(value: number) {
        this._streak = value;
    }

    update() {
        let epochtext = document.getElementById('progresstext');
        let accuracytext = document.getElementById('accuracytext');
        let streaktext = document.getElementById('streaktext');
        epochtext.innerText = `epoch ${this.progress}`;
        accuracytext.innerText = `accuracity: ${this.accuracy}%`;
        streaktext.innerText = `streak: ${this.streak}`;
        if (this._accuracy > 90 && this.streak >= 10) {
            this.currentwindow.close();
        }
    }
}