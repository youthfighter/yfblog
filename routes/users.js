const router = require('koa-router')()
const UserCtl = require('../src/controller//UserController')
const loginCheck = require('../midware/loginCheck')
router.prefix('/api')
/* 登录 */
router.post('/session', UserCtl.login)
/* 微信登录 */
router.get('/wx/session', UserCtl.wxLogin)
/* 获取登录用户信息 */
router.get('/session', loginCheck, UserCtl.getUserInfo)
/* 注销 */
router.delete('/session', loginCheck, UserCtl.layout)

module.exports = router
