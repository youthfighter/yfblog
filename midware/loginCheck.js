/* 
 *登录检测中间件
 *用户登录继续操作
 *用户未登录，直接返回401 
*/
const utils = require('../src/util/utils')
module.exports = async (ctx, next) => {
  if (ctx.session.user) {
    await next()
  } else {
    ctx.status = 401
    ctx.body = utils.translate('user.not.login')
  }
}