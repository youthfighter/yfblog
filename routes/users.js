const router = require('koa-router')()
const UserCtl = require('../src/controller//UserController')
const loginCheck = require('../midware/loginCheck')
router.prefix('/api/session')
/* 登录 */
router.post('/', UserCtl.login)
/* 获取登录用户信息 */
router.get('/', loginCheck, UserCtl.getUserInfo)
/* 注销 */
router.delete('/', loginCheck, UserCtl.layout)

module.exports = router
