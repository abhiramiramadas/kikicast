const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 435,
    height: 494,
    frame: false,
    resizable: false,
    transparent: true, // Enable transparency
    backgroundColor: '#00000000', // Fully transparent background
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

win.loadFile(path.join(__dirname, "src", "renderer", "homepage.html"));

win.on('restore', () => {
  win.webContents.send('window-restored');
});

  return win;
}

app.whenReady().then(() => {
  const win = createWindow();

  // Handle minimize event
  ipcMain.on("minimize-window", () => {
    BrowserWindow.getFocusedWindow()?.minimize();
  });

  // Handle close event
  ipcMain.on("close-window", () => {
    BrowserWindow.getFocusedWindow()?.close();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});