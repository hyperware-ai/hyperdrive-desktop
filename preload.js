const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'localApi', {
        sendAction: (action) => {
            ipcRenderer.send('action', action);
        },
        sendNodeForm: (formData) => {
            ipcRenderer.send('node-form', formData);
        },
        sendGoHome: (port) => {
            ipcRenderer.send('go-home', port);
        },
        onSelectedDirectory: (callback) => {
            ipcRenderer.on('selected-directory', (e, ...args) => callback(args));
        },
        onUpdateAvailable: (callback) => {
            ipcRenderer.on('update-available', (e, updateInfo) => callback(updateInfo));
        },
        openDownloadUrl: (url) => {
            ipcRenderer.send('open-download-url', url);
        },
        onBootedNodes: (callback) => {
            ipcRenderer.on('booted-nodes', (e, nodes) => callback(nodes));
        },
        loadBootedNodes: () => {
            ipcRenderer.send('load-booted-nodes');
        }
    }
);
