const {app, Menu, BrowserWindow} = require('electron');
const path = require('path');

function createWindow() {
    let win = new BrowserWindow({
        width: 500,
        height: 600,
    });

    win.loadFile(path.join(__dirname, 'views/index.html'));

    const template = [
        {
            label: 'File',
            submenu: [
                {role: 'quit'}
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        const {shell} = require('electron');
                        await shell.openExternal('https://github.com/LoZander/pathtracker-web');
                    }
                }
            ]
        }
    ];
    
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});