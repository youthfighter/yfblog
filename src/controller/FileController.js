const fs = require('fs-extra')
const uuidv4 = require('uuid/v4')
const imagePath = require('../../configs').imageServer.path
class FileController{
  async upload (ctx) {
    const {originalname, path, mimetype} = ctx.req.file
    console.log(originalname, path, mimetype)
    let end = originalname.substr(originalname.lastIndexOf('.'))
    fs.copy(path, `${imagePath}${uuidv4()}${end}`, err => {
      if (err) return console.error(err)
      console.log('success!')
    })
    ctx.body = 'success'
  }
}
module.exports = new FileController()