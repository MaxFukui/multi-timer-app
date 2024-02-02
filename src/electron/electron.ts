import { app, BrowserWindow, ipcMain } from 'electron';
//The path was imported this way because CommonJS modules doesn't have a default export
//So we need to use the * to import everything and then rename it to path
import * as path from 'path';
// import { play } from 'node-wav-player';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false,
        },
    });

    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}` // URL for the production build
    );
}

app.on('ready', createWindow);
