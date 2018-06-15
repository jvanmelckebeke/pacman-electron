import * as electron from 'electron';
import * as log from "electron-log";
import {BrowserWindow}  from 'electron';

const ipcRenderer = electron.ipcRenderer;

export class ProgressController {
    maxprogress: number; // todo

    private _progress: number;
    private currentwindow: BrowserWindow;

    constructor() {
        this.maxprogress = 1e5;
        this._progress = 0;
        this.currentwindow = electron.remote.getCurrentWindow();
        this.update();
        ipcRenderer.on('newprogress', (event, progress) => {
            // log.info('progress: ', progress);
            this.progress = progress;
            this.update();
        });
    }

    update() {
        let t = document.getElementById('progresstext');
        t.innerText = `epoch ${this.progress} of ${this.maxprogress}`;
        let perc = Math.floor(this.progress / this.maxprogress * 100);
        // log.info(`epoch ${this.progress} of ${this.maxprogress} = ${perc}%`);
        let prog = document.getElementById('progressbar');
        if (perc > 0) {
            prog.style.width = `${perc}%`;
        }
        if (perc == 100){
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