/**
 * @file symbolic
 * @author Cuttle Cong
 * @date 2018/3/29
 * @description
 */
import get from 'lodash.get'
import set from 'lodash.set'

function symbolic(target, property, [ref, prop]) {
  Object.defineProperty(target, property, {
    get() {
      return get(ref, prop)
    },
    set(val) {
      return set(ref, prop, val)
    }
  })
}

export default symbolic