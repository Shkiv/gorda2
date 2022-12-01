const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startInterval: () => ipcRenderer.send('start-interval'),
  stopInterval: () => ipcRenderer.send('stop-interval')
})