const fs = require('fs-extra')
const uuidv4 = require('uuid/v4')
const utils = require('../util/utils')
const LoginImageDao = require('../dao/loginImageDao')
const {path, url} = require('../../configs').imageServer
class LoginImageController{
  /* 上传新的背景图片 */
  async upload (ctx) {
    try{
      const {originalname, tempPath, mimetype} = ctx.req.file
      let end = originalname.substr(originalname.lastIndexOf('.'))
      /* 复制文件到指定文件夹下 */
      let imagePath = `${path}${uuidv4()}${end}`
      let imageUrl = `${url}${uuidv4()}${end}`
      await fs.copy(tempPath, imagePath)
      let loginImg = await LoginImageDao.findOne()
      /* 数据库中存在该配置则添加，不存在则插入配置 */
      let rLoginImage
      if (loginImg) {
        loginImg.imageList.push(imageUrl)
        rLoginImage = await loginImg.save()
      } else {
        rLoginImage = await LoginImageDao.insert({
          currImage: imageUrl,
          imageList: [imageUrl]
        })
      }
      fs.remove(tempPath)
      ctx.body = rLoginImage
    } catch(err) {
      if(err) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }    
  }
  /* 设置背景图片 */
  async setBgImage(ctx) {
    try{
      let index = parseInt(ctx.request.body.index)
      if (isNaN(index) || index < 0) {
        throw {status: 500, errCode:'image.set.fail'}
      }
      let loginImg = await LoginImageDao.findOne()
      let rLoginImage
      if (loginImg) {
        if(index > loginImg.imageList.length){
          throw {status: 500, errCode:'image.set.fail'}
        }
        loginImg.currImage = loginImg.imageList[index]
        loginImg.updateDate = new Date()
        rLoginImage = await loginImg.save()
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
  async getAllBgImage(ctx) {
    try{
      let loginImg = await LoginImageDao.findOne()
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
module.exports = new FileController()