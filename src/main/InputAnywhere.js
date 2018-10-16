import { app } from 'electron'
import AwaitEventEmitter from 'await-event-emitter'
import ioHook from 'iohook'

import Window from './Window'
import loadRCConfig from '../lib/loadRCConfig'
import symbolic from '../lib/symbolic'

export default class InputAnywhere extends AwaitEventEmitter {
  constructor({ app: appInArgument = app, ...opts } = {}) {
    super()
    this.app = appInArgument
    this.window = new Window({ app: appInArgument })
    symbolic(this.window, 'app', [this, 'app'])

    this.opts = opts
  }

  /**
   * Load runtime config
   * @return {Promise<InputAnywhere>}
   */
  async load() {
    const { config } = await loadRCConfig()
    Object.assign(this.opts, config)
    return this
  }

  run() {
    ioHook.start()
    const source = Rxjs.fromEvent(ioHook, 'keypress')

    source.pipe(windowTime(400)).subscribe(console.log)
    // ioHook.on('keypress', )

    this.app.on('before-quit', () => {
      ioHook.unload()
      ioHook.stop()
    })
  }

  destroy() {
    if (this.window) {
      this.window.destroy()
      this.window = null
    }
  }
}
