"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
function createWindow() {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    var isDev = process.defaultApp || /[\\/]electron[\\/]/.test(process.execPath);
    win.loadURL(isDev
        ? 'http://localhost:3000' // URL for the dev server
        : "file://".concat(path.join(__dirname, '../build/index.html')) // URL for the production build
    );
}
electron_1.app.on('ready', createWindow);
