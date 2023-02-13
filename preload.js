const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startInterval: () => ipcRenderer.send('start-active-interval'),
  stopInterval: () => ipcRenderer.send('stop-active-interval'),
  updateActiveInterval: () => ipcRenderer.send('update-active-interval'),
  updateIntervals: () => ipcRenderer.send('update-intervals')
})

ipcRenderer.on('intervals-updated', (_event, message) => {
  message.data.type = 'intervals-updated'
  window.postMessage(message, '/')
})

ipcRenderer.on('acitve-interval-updated', (_event, message) => {
  message.data.type = 'acitve-interval-updated'
  window.postMessage(message, '/')
})