const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Intervals = require('./intervals.js')
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

const intervals = new Intervals()

ipcMain.on('start-active-interval', () => {
  intervals.startActive()
})

ipcMain.on('stop-active-interval', () => {
  intervals.stopActive()
})

ipcMain.on('update-intervals', () => {
  intervals.updateToday()
})

const emitter = intervals.emitter

emitter.on('intervals-updated', () => {
  mainWindow.webContents.send('intervals-updated', intervals.today)
})

emitter.on('active-interval-updated', () => {
  mainWindow.webContents.send('intervals-updated', intervals.activeInterval)
})