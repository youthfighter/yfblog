const UserDao = require('../dao/UserDao')
const md5 = require('md5')
const utils = require('../util/utils')
const Session = require('../util/session')
const getWxInfo = require('../util/getWxInfo')
const log4js = require('../util/log4').getLogger('blog')
const configs = require('../../configs')
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
        const { name, password, captcha = '' } = ctx.request.body
        //根据用户名查找用户
        let user = await UserDao.findByName(name)
        let _captcha = ctx.session.captcha
        if (!captcha || !_captcha || captcha.toLowerCase() !== _captcha.toLowerCase()) {
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
  async wxBind(ctx) {
    try {
      const { name, password, code } = ctx.request.body
      const data = await getWxInfo(code, configs.appId, configs.secret)
      const openid = data.openid
      if (!openid) {
        throw {status: 500, errCode:'need.wx.id'}
      }
      let users = await UserDao.findByParams({weixin: openid})
      if (users.length > 0) {
        throw {status: 500, errCode:'has.bind.wx'}
      }
      /* 根据用户名密码查找该要绑定的用户 */
      let user = await UserDao.findByName(name)
      if (user && user.password === password) {
        user.weixin = openid
        await UserDao.update(user)
        delete user.password
        ctx.session.user = user
        ctx.body = {
          name: user.name
        }
      } else {
        throw {status: 500, errCode:'user.password.error'}
      }
    } catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  async wxLogin(ctx) {
    try {
      const { code } = ctx.request.body
      const data = await getWxInfo(code, configs.appId, configs.secret)
      if (!data.openid) throw {status: 500, errCode:'not.bind.wx'}
      let users = await UserDao.findByParams({weixin: data.openid})
      if (users.length > 0) {
        const user = users[0]
        delete user.password
        ctx.session.user = user
        ctx.body = {
          name: user.name
        }
      } else {
        throw {status: 500, errCode:'not.bind.wx'}
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
