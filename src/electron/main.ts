import { app, BrowserWindow } from 'electron';
//The path was imported this way because CommonJS modules doesn't have a default export
//So we need to use the * to import everything and then rename it to path
import * as path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    const isDev = process.defaultApp || /[\\/]electron[\\/]/.test(process.execPath);

    win.loadURL(
        isDev
            ? 'http://localhost:3000' // URL for the dev server
            : `file://${path.join(__dirname, '../build/index.html')}` // URL for the production build
    );
}

app.on('ready', createWindow);
