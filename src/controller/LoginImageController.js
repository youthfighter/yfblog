const utils = require('../util/utils')
const LoginImageDao = require('../dao/loginImageDao')
const {path, url} = require('../../configs').imageServer
const ImageCtr = require('../controller/ImageController')
class LoginImageController{
  /* 上传新的背景图片 */
  async uploadBgImage (ctx) {
    try{
      let image = await ImageCtr._upload(ctx.session.user.name, ctx.req.file)
      let imageSrc= image.src
      let loginImg = await LoginImageDao.findOne()
      /* 数据库中存在该配置则添加，不存在则插入配置 */
      let rLoginImage
      if (loginImg) {
        loginImg.imageList.push(imageSrc)
        rLoginImage = await LoginImageDao.update(loginImg)
      } else {
        rLoginImage = await LoginImageDao.insert({
          currImage: imageSrc,
          imageList: [imageSrc]
        })
      }
      ctx.body = rLoginImage
    } catch(e) {
      if (e) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }    
  }
  /* 设置背景图片 */
  async setBgImage(ctx) {
    try{
      let index = parseInt(ctx.params.index)
      if (isNaN(index) || index < 0) throw {status: 500, errCode:'image.set.fail'}
      let loginImg = await LoginImageDao.findOne()
      let rLoginImage
      if (loginImg) {
        if(index > loginImg.imageList.length){
          throw {status: 500, errCode:'image.set.fail'}
        }
        loginImg.currImage = loginImg.imageList[index]
        loginImg.updateDate = new Date()
        rLoginImage = await LoginImageDao.update(loginImg)
        ctx.body = rLoginImage
      } else {
        throw {status: 500, errCode:'image.set.fail'}
      }
    } catch (e) {
      if (e) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  /* 获取所有登陆背景图片 */
  async getAllBgImages(ctx) {
    try{
      let loginImg = await LoginImageDao.findOne()
      ctx.body = loginImg
      /* 不存在配置 */
      if (!loginImg) {
        throw {status: 500, errCode:'image.not.set'}
      }
      ctx.body = loginImg
    } catch (e) {
      if (e) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  /* 获取当前登陆背景图片 */
  async getCurrBgImage(ctx) {
    try{
      let loginImg = await LoginImageDao.findOne()
      /* 不存在配置 */
      if (!loginImg) {
        throw {status: 500, errCode:'image.not.set'}
      }
      ctx.body = loginImg.currImage
    } catch (e) {
      if (e) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
}
module.exports = new LoginImageController()