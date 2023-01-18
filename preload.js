const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startInterval: () => ipcRenderer.send('start-interval'),
  stopInterval: () => ipcRenderer.send('stop-interval'),
  updateIntervals: () => ipcRenderer.send('update-intervals')
})

ipcRenderer.on('intervals-updated', (event, message) => window.postMessage(message, '/'))