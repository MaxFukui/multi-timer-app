import { contextBridge, ipcRenderer } from 'electron';
import path from 'path';

contextBridge.exposeInMainWorld('electronAPI', {
    playAudio: (audioName) => {
        ipcRenderer.send('play-audio', audioName);
    },
    basePath: __dirname
});