const jwt = require('jsonwebtoken')
const utils = require('../src/util/utils')
/* 中间件
* 验证token是否有效
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
      ctx.userid = tokenContent.userid
    } catch (err) {
      ctx.status = 401
      ctx.body = utils.translate('user.not.login')
    }
  }
}