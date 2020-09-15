import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as dotenv from 'dotenv';
import ElectronStore from 'electron-store';

dotenv.config();

let win: BrowserWindow | null;

const store = new ElectronStore();

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log); // eslint-disable-line no-console
};

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  win = new BrowserWindow({
    height: 800,
    width: 800,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });
  win.getNativeWindowHandle();

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
    win.loadURL('http://localhost:2003');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once('dom-ready', () => {
      win!.webContents.openDevTools();
    });
  }

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  app.exit(0);
});

app.on('activate', () => {
  if (win === null) {
    createWindow().then(() => console.log('Window created'));

  }
});


ipcMain.handle('getLocalUser', (event) => {
  return store.get('localUser');
});

ipcMain.handle('setLocalUser', (event, payload) => {
  return store.set('localUser', payload);
});
