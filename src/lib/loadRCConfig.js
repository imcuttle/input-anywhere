/**
 * @file loadConfig
 * @author Cuttle Cong
 * @date 2018/10/16
 * 
 */

const explorer = require('cosmiconfig')(require('../../package').name)

module.exports = explorer.search

// explorer.search(process.cwd()).then(console.log)