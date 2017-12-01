const svgCaptcha = require('svg-captcha')
const log4js = require('../util/log4').getLogger('blog')
const utils = require('../util/utils')
class Captcha{
  async getCaptcha (ctx) {
    try {
      let captcha = svgCaptcha.create()
      ctx.session.captcha = captcha.text
      ctx.body = {
        captcha: captcha.data
      }
    } catch (e) {
      if (e) {
        log4js.error(e)
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
}
module.exports = new Captcha()