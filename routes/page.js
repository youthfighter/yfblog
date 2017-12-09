const router = require('koa-router')()
const PageCtl = require('../src/controller/PageController')
const loginCheck = require('../midware/loginCheck')
router.prefix('/api')
/* 获取全部的页面信息 */
router.get('/pages', loginCheck, PageCtl.getPages)
/* 新建一个页面 */
router.post('/page', loginCheck, PageCtl.insertPage)
/* 更新一个页面 */
router.put('/page/:id', loginCheck, PageCtl.updatePage)
/* 删除一个页面 */
router.delete('/page/:id', loginCheck, PageCtl.deletePage)

module.exports = router
