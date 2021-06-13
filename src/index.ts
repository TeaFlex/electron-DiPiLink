import { app, BrowserWindow, shell } from 'electron';
import { join } from "path";

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 600, 
        autoHideMenuBar: true,
        roundedCorners: true,
        webPreferences:{
            devTools: true,
            preload: join(__dirname, "preload.js")
        }
    });
    
    win.loadFile('public/build/index.html');

    win.webContents.on("new-window", (e, url) => {
        shell.openExternal(url);
        e.preventDefault();
    });
}

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});