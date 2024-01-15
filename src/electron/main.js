const { app, BrowserWindow } = require('electron');
const path = require('path');

let isDev;

async function createWindow() {
    if (isDev === undefined) {
        isDev = await import('electron-is-dev').then((module) => module.default);
    }

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
