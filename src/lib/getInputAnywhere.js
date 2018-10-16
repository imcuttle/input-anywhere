/**
 * @file getInputAnywhere
 * @author Cuttle Cong
 * @date 2018/10/16
 * 
 */
const Rxjs = require('rxjs')
const { filter, map } = require('rxjs/operators')
const ioHook = require('iohook')
const { keyCodeInfo } = require('linux-key-info')

ioHook.start()
const keypress = Rxjs.fromEvent(ioHook, 'keydown')

keypress.pipe(
  // map(e => ({ ...keyCodeInfo(e.keycode), ...e }))
).subscribe(console.log, console.log, console.error)

