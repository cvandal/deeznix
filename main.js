const { app, BrowserWindow, screen, session } = require("electron");
const path = require("path");
const { ElectronBlocker } = require("@cliqz/adblocker-electron");
const fetch = require("cross-fetch");

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const workAreaSize = display.workAreaSize;

  const mainWindow = new BrowserWindow({
    width: parseInt(workAreaSize.width * 0.75),
    height: parseInt(workAreaSize.height * 0.75),
    autoHideMenuBar: true,
    icon: path.join(__dirname, "logo.png"),
  });

  mainWindow.loadURL("https://deezer.com/", {
    userAgent:
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
  });

  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow.destroy();
  });
}

app.whenReady().then(async () => {
  ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInSession(session.defaultSession);
  });

  createWindow();
});
