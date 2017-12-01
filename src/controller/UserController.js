const UserDao = require('../dao/UserDao')
const md5 = require('md5')
const utils = require('../util/utils')
const Session = require('../util/session')
const log4js = require('../util/log4').getLogger('blog')
class UserController{
  /* 获取当前登录用户的部分用户信息 */
  async getUserInfo(ctx) {
    try{
      const name = ctx.session.user.name
      ctx.body = { name }
      
    }catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  /* 用户登录 */
  async login(ctx) {
    try{
      //判断用户是否登录
      if (ctx.session.user) {
        ctx.body = ctx.session.user.name
      } else {
        //获取用户名密码
        const { name, password, captcha } = ctx.request.body
        //根据用户名查找用户
        let user = await UserDao.findByName(name)
        let _captcha = ctx.session.captcha
        if (captcha !== _captcha) {
          throw {status: 500, errCode:'user.captcha.error'}
        } else {
          ctx.session.captcha = null
        }
        //用户存在，密码验证通过，返回sessionid
        if (user && user.password === password) {
          delete user.password
          ctx.session.user = user
          ctx.body = {
            name: user.name
          }
        }else{
          throw {status: 500, errCode:'user.password.error'}
        }
      }
    } catch(e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  async layout (ctx) {    
    try {
      if (ctx.session.user) ctx.session = null
      ctx.body = 'success'
    } catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
}

module.exports = new UserController()
