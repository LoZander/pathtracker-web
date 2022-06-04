const {app, Menu, BrowserWindow, ipcRenderer, dialog} = require('electron');
const path = require('path');

function createWindow() {
    let win = new BrowserWindow({
        width: 500,
        height: 600,
        minWidth: 300,
        minHeight: 260,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.loadFile(path.join(__dirname, 'views/index.html'));

    const template = [
        {
            label: 'File',
            submenu: [
                {role: 'quit'},
                {
                    label: 'Save',
                    click: () => {
                        dialog.showSaveDialog(win, {
                            title: 'Save tracker',
                            filters: [
                                {name: 'Tracker file', extensions: ['json']}
                            ],
                            defaultPath: path.join(app.getAppPath(), '..', 'saves', 'save.json'),
                        }).then(file => {
                            if(!file.canceled) {
                                win.webContents.send('request_save', file.filePath.toString());
                            }
                        });
                    },
                    accelerator: 'Ctrl+S'
                },
                {
                    label: 'Load',
                    click: () => {
                        const paths = dialog.showOpenDialogSync(win, {
                            title: 'Load tracker',
                            filters: [
                                {name: 'Tracker file', extensions: ['json']}
                            ],
                            defaultPath: path.join(app.getAppPath(), '..', 'saves', 'save.json'),
                        });

                        if(paths != undefined) win.webContents.send('request_load', paths[0])
                    },
                    accelerator: 'Ctrl+L'
                }
                
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Next turn',
                    click: () => win.webContents.send('request_next_turn'),
                    accelerator: 'Ctrl+E'
                },
                {
                    label: 'Clear',
                    click: () => win.webContents.send('request_clear')
                }
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