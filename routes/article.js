const router = require('koa-router')()
const ArticleCtl = require('../src/controller/ArticleController')

router.prefix('/article')
router.get('/all',ArticleCtl.getAll)
router.get('/:id',ArticleCtl.getOne)

module.exports = router
