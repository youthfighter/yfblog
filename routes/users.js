const router = require('koa-router')()
const UserCtl = require('../src/controller//UserController')
router.prefix('/api/mangement')

router.post('/login', UserCtl.login)
router.get('/getUserInfo', UserCtl.getUserInfo)
router.post('/layout', UserCtl.layout)

module.exports = router
