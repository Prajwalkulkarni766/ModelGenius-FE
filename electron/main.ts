import { app, BrowserWindow, Menu } from 'electron' // 1. Added Menu import
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

// 2. Define a minimal menu that allows Copy/Paste but removes everything else
const template: any = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' }
    ]
  }
];

function createWindow() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  win = new BrowserWindow({
    width: 1280,
    height: 800,
    // Start with 'show: false' to prevent a "flicker" while it resizes
    show: false,
    icon: path.join(__dirname, '..', 'public', 'icon.ico'),

    frame: true,
    title: "ModelGenius",

    // IMPORTANT: Temporarily allow these so win.maximize() works
    resizable: true,
    maximizable: true,

    minimizable: true,
    closable: true,
    autoHideMenuBar: true,
    movable: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      devTools: !app.isPackaged,
    },
  })

  // 1. Maximize first
  win.maximize();

  // 2. Show the window only after maximizing is triggered
  win.show();

  // 3. Optional: Lock it now so the user can't manually resize it
  // If you do this, the window stays maximized and the edges are locked.
  win.setResizable(false);

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)