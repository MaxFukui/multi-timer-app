import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import * as path  from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000' // URL for the dev server
            : `file://${path.join(__dirname, '../build/index.html')}` // URL for the production build
    );
}

app.on('ready', createWindow);
