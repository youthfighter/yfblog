const jwt = require('jsonwebtoken')
const utils = require('../src/util/utils')
/* 
 *登录检测中间件token
 *用户登录继续操作
 *用户未登录，直接返回401 
*/
module.exports = async (ctx, next) => {
  const token = ctx.request.header['authorization']
  if (token === '') {
    ctx.status = 401
    ctx.body = utils.translate('user.not.login')
  } else {
    let tokenContent
    try {
      tokenContent = await jwt.verify(token, 'sinner77')
      ctx.state.userid = tokenContent.userid
      await next()
    } catch (err) {
      ctx.status = 401
      ctx.body = utils.translate('user.not.login')
    }
  }
}