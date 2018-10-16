/**
 * @file bindEvents
 * @author Cuttle Cong
 * @date 2018/10/16
 *
 */
const isPlainObj = require('is-plain-obj')

export default function bindEvents(target, event, handler) {
  const fnList = []
  if (isPlainObj(event)) {
    Object.keys(event).forEach(eventName => {
      const handler = event[eventName]
      fnList.push(bindEvents(target, eventName, handler))
    })
  } else if (typeof event === 'string') {
    target.on(event, handler)
    fnList.push(() => target.off(event, handler))
  }

  return () => fnList.forEach(fn => fn())
}
