/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/10/16
 * 
 */

import InputAnywhere from './InputAnywhere'

const ia = new InputAnywhere()

;(async function () {
  await ia.load()

  ia.run()
}())
