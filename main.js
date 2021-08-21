const { app, BrowserWindow, screen } = require("electron");

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width * 0.9,
    height: height * 0.9,
    autoHideMenuBar: true,
    icon: require("path").join("logo.png"),
  });

  mainWindow.loadURL("https://deezer.com/", {
    userAgent:
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
