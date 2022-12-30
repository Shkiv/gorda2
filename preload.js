const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startInterval: () => ipcRenderer.send('start-interval'),
  stopInterval: () => ipcRenderer.send('stop-interval'),
  updateIntervals: () => ipcRenderer.send('update-intervals')
})

ipcRenderer.on('intervals-updated', (event, message) => {
  let intervalTable = document.createElement("table")
  intervalTable.id = "intervalTable"
  let oldIntervalTable = document.getElementById("intervalTable")
  
  message.forEach(interval => {
    let cell = document.createElement("td")
    let row = document.createElement("tr")
    cell.textContent = JSON.stringify(interval)
    row.appendChild(cell)
    intervalTable.appendChild(row)
  })

  oldIntervalTable.replaceWith(intervalTable)
})