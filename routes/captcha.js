const router = require('koa-router')()
const CaptchaCtl = require('../src/controller/CaptchaController')
router.prefix('/api')
/* 获取验证码 */
router.get('/captcha', CaptchaCtl.getCaptcha)
module.exports = router
