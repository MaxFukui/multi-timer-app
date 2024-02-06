"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
//The path was imported this way because CommonJS modules doesn't have a default export
//So we need to use the * to import everything and then rename it to path
var path = require("path");
function createWindow() {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false
        }
    });
    // const isDev = process.defaultApp || /[\\/]electron[\\/]/.test(process.execPath);
    // win.loadURL(
    //     isDev
    //         ? 'http://localhost:3000' // URL for the dev server
    //         : `file://${path.join(__dirname, '../build/index.html')}` // URL for the production build
    // );
    win.loadURL("file://".concat(path.join(__dirname, '../build/index.html')) // URL for the production build
    );
}
electron_1.app.on('ready', createWindow);
