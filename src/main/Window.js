import { BrowserWindow } from 'electron'
import * as path from 'path'
import { format } from 'url'
import bind from '../lib/bindEvents'

const isDevelopment = process.env.NODE_ENV !== 'production'

export default class Window {
  constructor({ app } = {}) {
    this.mainWindow = null
    this.app = app
    this._init()
  }

  _init() {
    this._disposer = bind(this.app, {
      'window-all-closed': () => {
        // on macOS it is common for applications to stay open until the user explicitly quits
        if (process.platform !== 'darwin') {
          this.app.quit()
        }
      },
      activate: () => {
        // on macOS it is common to re-create a window even after all windows have been closed
        if (this.mainWindow === null) {
          this.mainWindow = this._createMainWindow()
        }
      },
      ready: () => {
        this.mainWindow = this._createMainWindow()
      }
    })
  }

  _createMainWindow() {
    const window = new BrowserWindow({
      frame: false,
      maxHeight: 200,
      // height: 200,
      show: false
    })

    if (isDevelopment) {
      window.webContents.openDevTools()
    }

    window.on('closed', () => {
      this.mainWindow = null
    })

    window.webContents.on('devtools-opened', () => {
      window.focus()
      setImmediate(() => {
        window.focus()
      })
    })

    return window
  }

  showWindow() {
    const window = this.mainWindow
    if (!window) {
      throw new Error(`this.mainWindow is required`)
    }

    if (isDevelopment) {
      window.loadURL(
        `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      )
    } else {
      window.loadURL(
        format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file',
          slashes: true
        })
      )
    }
    window.show()
  }

  destroy() {
    if (typeof this._disposer === 'function') {
      this._disposer()
    }
    this.mainWindow.destroy()
    this.mainWindow = null
  }
}
