const UserDao = require('../dao/UserDao')
const md5 = require('md5')
const utils = require('../util/utils')
const Session = require('../util/session')
const log4js = require('../util/log4').getLogger('blog')
const createToken = require('../util/createToken')
const UserCache = require('../redis/UserCache')
const getWxInfo = require('../util/getWxInfo')
const configs = require('../../configs')
class UserController{
  /* 获取当前登录用户的部分用户信息 */
  async getUserInfo(ctx) {
    try{
      const user = await UserCache.get(ctx.state.userid)
      ctx.body = { user }
      
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
      //获取用户名密码
      const { name, password, captcha = '' } = ctx.request.body
      //根据用户名查找用户
      let user = await UserDao.findByName(name)
      //用户存在，密码验证通过，返回sessionid
      if (user && user.password === password) {
        delete user.password
        await UserCache.set(user._id, user)
        ctx.body = {
          name: user.name,
          token: createToken(user._id)
        }
      }else{
        throw {status: 500, errCode:'user.password.error'}
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
      const data = await getWxInfo(ctx.query.code, configs.appId, configs.secret)
      const openId = data.openId
      if (openId) {
        throw {status: 500, errCode:'need.wx.id'}
      }
      let users = await UserDao.findByParams({weixin: openId})
      if (users.length > 0) {
        throw {status: 500, errCode:'has.bind.wx'}
      }
      /* 根据用户名密码查找该要绑定的用户 */
      let user = await UserDao.findByName(name)
      if (user && user.password === password) {
        user.weixin = openId
        await UserDao.update(user)
        delete user.password
        await UserCache.set(user._id, user)
        ctx.body = {
          name: user.name,
          token: createToken(user._id)
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
      const data = await getWxInfo(code, 'wx2bbde56f72774ab0', '')
      let users = await UserDao.findByParams({weixin: data.openId})
      if (users.length > 0) {
        const user = users[0]
        delete user.password
        await UserCache.set(user._id, user)
        ctx.body = {
          name: user.name,
          token: createToken(user._id)
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
      if (ctx.state.userid) UserCache.remove(ctx.state.userid)
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
