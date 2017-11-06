const router = require('koa-router')()
const ArticleCtl = require('../src/controller/ArticleController')

router.prefix('/api/article')
router.get('/all',ArticleCtl.getAll)
router.get('/:id',ArticleCtl.getOne)
router.post('/insert',ArticleCtl.insertArticle)

module.exports = router
