const router = require('koa-router')()
const ArticleCtl = require('../src/controller/ArticleController')
const loginCheck = require('../midware/loginCheck')
router.prefix('/api')
/* 获取全部的文章 */
router.get('/articles', ArticleCtl.getArticles)
/* 获取某篇文章 */
router.get('/articles/:articleId', ArticleCtl.getArticle)
/* 新建一篇文章 */
router.post('/articles', loginCheck, ArticleCtl.insertArticle)
/* 修改某篇文章 */
router.put('/articles/:articleId', loginCheck, ArticleCtl.updateArticle)
module.exports = router
