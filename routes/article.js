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
/* 获取最新的文章 */
router.get('/newarticles', ArticleCtl.getNewArticles)
/* 获取最热的文章 */
router.get('/hotarticles', ArticleCtl.getHotArticles)
/* 获取userid的全部的文章 */
router.get('/owner/articles', loginCheck, ArticleCtl.getOwnerArticles)
/* 获取userid的某篇文章 */
router.get('/owner/articles/:articleId', loginCheck, ArticleCtl.getOwnerArticle)

module.exports = router
