const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Interval = require('./interval.js')
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
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
    Interval.updateAll()
  }
})

ipcMain.on('stop-interval', () => {
  if (currentInterval !== null) {
    currentInterval.stop()
    currentInterval = null
    Interval.updateAll()
  }
})

ipcMain.on('update-intervals', () => {
  Interval.updateAll()
})

const emitter = Interval.emitter

emitter.on('intervals-updated', () => {
  mainWindow.webContents.send('intervals-updated', Interval.all)
})