const { app, BrowserWindow, screen, session } = require("electron");
const path = require("path");
const { ElectronBlocker } = require("@cliqz/adblocker-electron");
const fetch = require("cross-fetch");

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width * 0.9,
    height: height * 0.9,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "logo.png"),
  });

  mainWindow.loadURL("https://deezer.com/", {
    userAgent:
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
  });
}

app.whenReady().then(async () => {
  ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInSession(session.defaultSession);
  });

  createWindow();
});
