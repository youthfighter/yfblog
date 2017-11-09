const router = require('koa-router')()
const LoginImgCtr = require('../src/controller/ImageController')
const multer = require('koa-multer')
const loginCheck = require('../midware/loginCheck')
const { dest, inputName } = require('../configs').imageServer
const upload = multer({dest})
/* 上传图片 */
router.post('/api/images', loginCheck, upload.single(inputName), LoginImgCtr.upload)
module.exports = router