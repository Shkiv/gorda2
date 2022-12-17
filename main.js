const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Interval = require('./interval.js')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 480,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  Interval.initDb()
  Interval.updateAll()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

let currentInterval = null

ipcMain.on('start-interval', () => {
  if (currentInterval === null) {
    currentInterval = new Interval()
    currentInterval.start()
  }
})

ipcMain.on('stop-interval', () => {
  if (currentInterval !== null) {
    currentInterval.stop()
    currentInterval = null
  }
})