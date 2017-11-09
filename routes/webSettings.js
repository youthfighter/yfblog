const router = require('koa-router')()
const LoginImgCtr = require('../src/controller/LoginImageController')
const loginCheck = require('../midware/loginCheck')
const multer = require('koa-multer')
const upload = multer({dest: 'uploads/'})
const { dest, inputName } = require('../configs').imageServer
router.prefix('/api/settings')
/* 添加登录背景图列表项 */
router.post('/loginBgImages', loginCheck, upload.single(inputName), LoginImgCtr.uploadBgImage)
/* 修改背景图 */
router.put('/loginBgImages/:index', loginCheck, LoginImgCtr.setBgImage)
/* 获取全部背景图 */
router.get('/loginBgImages', loginCheck, LoginImgCtr.getAllBgImages)
/* 获取当前背景图 */
router.get('/loginBgImage', loginCheck, LoginImgCtr.getCurrBgImage)
module.exports = router