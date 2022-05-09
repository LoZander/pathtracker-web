const {app, BrowserWindow} = require('electron');

function createWindow() {
    let win = new BrowserWindow({
        width: 1280,
        height: 1024
    });

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});