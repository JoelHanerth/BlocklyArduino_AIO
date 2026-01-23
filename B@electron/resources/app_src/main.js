const {
    electron,
    ipcMain,
    app,
    BrowserWindow,
    globalShortcut,
    dialog
} = require('electron');
var path = require('path');
let mainWindow = null;
let termWindow = null;
let factoryWindow = null;
//const userDataPath = app.getPath ('userData')
//read INI file
const fs = require('fs-extra');
var fileSettings = "./Blockly@rduino.json";
var Settings = '';

app.setPath('userData', app.getAppPath());

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
})
function createMainWindow() {
    mainWindow = new BrowserWindow({
            width: 1280,
            height: 800,
            titleBarStyle: 'hidden',
            thickFrame: true,
			webPreferences: {
				nodeIntegration: true
			},
            icon: './www/favicon.ico'
        });
    if (!fs.existsSync(fileSettings)) {
        console.log("File not found");
        fs.writeFileSync(fileSettings, '', (err) => {
            if (err) {
                console.log("An error ocurred creating the file " + err.message);
            }
            console.log("The file has been succesfully saved");
            })
        } else {
            var Settings = fs.readFileSync(fileSettings, 'utf8', (err, Settings) => {
                    if (err) {
                        console.log("An error occured reading the file :" + err.message);
                        Settings = "";
                        return
                    }
                    console.log("The file Settings is : " + Settings);
            })
    };
    var url = '../../../www/';
    // var url = '/www/';
    if (process.platform == 'win32') {
        if (process.argv.length >= 2) {
            if ((process.argv[1]).startsWith("index_AIO")) {
                mainWindow.loadURL(`file://${__dirname}` + url + process.argv[1]);
            } else {
                // no use yet for arguments in Electron single mode
                mainWindow.loadURL(`file://${__dirname}` + url + 'index_electron.html');
            }
        } else {
            if (Settings == "" || Settings == "undefined") {
                mainWindow.loadURL(`file://${__dirname}` + url + 'index_electron.html');
            } else {
                Settings = Settings.replace('"', '');
                Settings = Settings.replace('"', '');
                mainWindow.loadURL(`file://${__dirname}` + url + 'index_electron.html' + Settings);
            }
        }
    }
    mainWindow.setMenu(null);

    // Quando o renderer usar window.onbeforeunload/beforeunload para
    // sinalizar alterações não salvas, o Electron emite o evento
    // 'will-prevent-unload'. Aqui mostramos um diálogo nativo para o
    // usuário escolher se quer realmente sair.
    mainWindow.webContents.on('will-prevent-unload', (event) => {
        const choice = dialog.showMessageBoxSync(mainWindow, {
            type: 'warning',
            buttons: ['Sair sem salvar', 'Cancelar'],
            defaultId: 1,
            cancelId: 1,
            title: 'Projeto não salvo',
            message: 'Você tem alterações não salvas neste projeto. Deseja realmente sair?'
        });

        // Em Electron, chamar preventDefault aqui permite que o unload
        // prossiga (ou seja, a janela fecha). Se não chamarmos, o unload
        // continua bloqueado.
        if (choice === 0) {
            event.preventDefault();
        }
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    })
}
function open_console(mainWindow = BrowserWindow.getFocusedWindow()) {
    if (mainWindow) {
		devtools = new BrowserWindow();
		mainWindow.webContents.setDevToolsWebContents(devtools.webContents);
		mainWindow.webContents.openDevTools({
			mode: 'detach'
		});
    }
}
function refresh(mainWindow = BrowserWindow.getFocusedWindow()) {
    if (mainWindow) {
        mainWindow.webContents.reloadIgnoringCache();
    }
}

//need to be deleted at next serialport upgrad > 9.0.0
app.allowRendererProcessReuse = false;
app.on('ready', function () {
    createMainWindow();
    globalShortcut.register('CmdOrCtrl+I', open_console);
    globalShortcut.register('F8', open_console);
    globalShortcut.register('CmdOrCtrl+R', refresh);
    globalShortcut.register('F5', refresh);
    // devtools = new BrowserWindow();
    // mainWindow.webContents.setDevToolsWebContents(devtools.webContents);
    // mainWindow.webContents.openDevTools({
        // mode: 'detach'
    // });
})
app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
    }
})

function createTerm() {
    termWindow = new BrowserWindow({
            width: 660,
            height: 660,
            'parent': mainWindow,
			webPreferences: {
				nodeIntegration: true
			},
            resizable: false,
            movable: true,
            frame: true,
            modal: false
        });        
    termWindow.loadURL(`file://${__dirname}` + '../../../www/tools/serialconsole/serialconsole.html');
    termWindow.setMenu(null);
    termWindow.on('closed', function () {
        termWindow = null;
    })
    // devtools = new BrowserWindow();
    // termWindow.webContents.setDevToolsWebContents(devtools.webContents);
    // termWindow.webContents.openDevTools({
        // mode: 'detach'
    // });
}
ipcMain.on("prompt", function () {
    createTerm();
});

function createfactory(argLangChoice) {
    factoryWindow = new BrowserWindow({
            width: 1200,
            height: 800,
            'parent': mainWindow,
			webPreferences: {
				nodeIntegration: true
			},
            resizable: true,
            movable: true,
            frame: true,
            modal: true
        });
    factoryWindow.loadURL(`file://${__dirname}` + '../../../www/tools/factory/block_factory.html?lang=' + argLangChoice);
    factoryWindow.setMenu(null);
    factoryWindow.on('closed', function () {
        factoryWindow = null;
    })
    // devtools = new BrowserWindow();
    // factoryWindow.webContents.setDevToolsWebContents(devtools.webContents);
    // factoryWindow.webContents.openDevTools({
        // mode: 'detach'
    // });
}
ipcMain.on("factory", (event, argLangChoice) => {
    createfactory(argLangChoice);
});
module.exports.open_console = open_console;
module.exports.refresh = refresh;

// =============================================================
//  Abertura nativa de projetos Blockly@rduino
// =============================================================

ipcMain.handle('blockly-open-project', async (event) => {
    try {
        const { filePaths, canceled } = await dialog.showOpenDialog({
            title: 'Abrir projeto Blockly@rduino',
            filters: [
                { name: 'Projetos Blockly@rduino', extensions: ['B@', 'xml'] },
                { name: 'Todos os arquivos', extensions: ['*'] }
            ],
            properties: ['openFile']
        });

        if (canceled || !filePaths || !filePaths[0]) {
            return { canceled: true };
        }

        const filePath = filePaths[0];
        let content = '';
        try {
            content = fs.readFileSync(filePath, 'utf8');
        } catch (e) {
            console.error('Erro ao ler projeto:', e);
            return { canceled: true, error: String(e) };
        }

        return { canceled: false, filePath, content };
    } catch (e) {
        console.error('Erro no handler blockly-open-project:', e);
        return { canceled: true, error: String(e) };
    }
});

// =============================================================
//  Salvamento nativo de projetos Blockly@rduino
// =============================================================

// Handler "Salvar como" (primeira vez ou quando o usuário quiser trocar o nome)
ipcMain.handle('blockly-save-project-as', async (event, args) => {
    try {
        const content = (args && args.content) || '';
        const suggestedName = (args && args.suggestedName) || 'blockly_arduino.B@';
        const baseDir = path.join(app.getPath('userData'), 'projects');
        try {
            fs.ensureDirSync(baseDir);
        } catch (e) {
            // se não conseguir criar, ainda deixamos o usuário escolher outra pasta
        }

        const { filePath, canceled } = await dialog.showSaveDialog({
            title: 'Salvar projeto Blockly@rduino',
            defaultPath: path.join(baseDir, suggestedName),
            filters: [
                { name: 'Projetos Blockly@rduino', extensions: ['B@', 'xml'] },
                { name: 'Todos os arquivos', extensions: ['*'] }
            ]
        });

        if (canceled || !filePath) {
            return { canceled: true };
        }

        fs.writeFileSync(filePath, content, 'utf8');
        return { canceled: false, filePath };
    } catch (e) {
        console.error('Erro ao salvar projeto (Salvar como):', e);
        return { canceled: true, error: String(e) };
    }
});

// Handler "Salvar" (sobrescreve silenciosamente o último arquivo)
ipcMain.handle('blockly-save-project', async (event, args) => {
    try {
        const content = (args && args.content) || '';
        const filePath = (args && args.filePath) || '';
        if (!filePath) {
            return { canceled: true, error: 'NO_PATH' };
        }
        fs.writeFileSync(filePath, content, 'utf8');
        return { canceled: false, filePath };
    } catch (e) {
        console.error('Erro ao salvar projeto (Salvar):', e);
        return { canceled: true, error: String(e) };
    }
});
