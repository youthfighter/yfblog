const fs = require('fs-extra')
const uuidv4 = require('uuid/v4')
const utils = require('../util/utils')
const ImageDao = require('../dao/ImageDao')
const {dirPath, webUrl} = require('../../configs').imageServer
class ImageController{
  /* 上传新的背景图片 */
  async upload (ctx) {
    try{
      let image = await new ImageController()._upload(ctx.session.user.name, ctx.req.file)
      ctx.body = image.src
    } catch(err) {
      if(err) {
        let info = utils.catchError(err)
        ctx.status = info.status
        ctx.body = info.body
      }
    }    
  }
  async _upload (anthor, {originalname, path, mimetype}) {
    let end = originalname.substr(originalname.lastIndexOf('.'))
    /* 复制文件到指定文件夹下 */
    let uuid = uuidv4()
    let imagePath = `${dirPath}${uuid}${end}`
    let imageSrc = `${webUrl}${uuid}${end}`
    await fs.copy(path, imagePath)
    fs.remove(path)
    let image = await ImageDao.insert({
      path: imagePath,
      src: imageSrc,
      anthor 
    })    
    return image 
  }
}
module.exports = new ImageController()