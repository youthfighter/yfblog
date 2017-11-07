const UserDao = require('../dao/UserDao')
const md5 = require('md5')
const utils = require('../util/utils')
const Session = require('../util/session')
class UserController{
  async getUserInfo(ctx) {
    try{
      let sei = new Session(ctx)
      if (sei.getUser()) {
        const name = sei.getUserName
        ctx.body = { name }
      } else {
        throw {}
      }
    }catch (e) {
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  async login(ctx) {
    console.log(1,ctx.Session)
    try{
      //判断用户是否登录
      let sei = new Session(ctx)
      if (sei.getUser()) {
        ctx.body = `${sei.getUserName()} 已登录，请勿重复登录`
      } else {
        //获取用户名密码
        const { name, password } = ctx.request.body
        //根据用户名查找用户
        let user = await UserDao.findByName(name)
        //用户存在，密码验证通过，返回sessionid
        if (user && user.password === password) {
          sei.setUser(user)
          ctx.body = user.name
        }else{
          throw {status: 500, errCode:'user.password.error'}
        }
      }
    } catch(e) {
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  async layout (ctx) {    
    try {
      let sei = new Session(ctx)
      if (sei.getUser()) {
        sei.setUser(null)
      }
      ctx.body = 'success'
    } catch (e) {
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
}

module.exports = new UserController()
