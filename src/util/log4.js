const log4js = require('log4js')
const config = require('../../configs')
log4js.configure({
  appenders: { blog: { type: 'file', filename: './logs/blog.log' } },
  categories: { default: { appenders: ['blog'], level: 'info' } }
})
module.exports = log4js