const router = require('koa-router')()
const TaskCtl = require('../src/controller/TaskController')
const loginCheck = require('../midware/loginCheck')
router.prefix('/api')
/* 获取任务 */
router.get('/tasks', TaskCtl.getTask)
/* 获取某篇文章 */
router.get('/tasks/:articleId', ArticleCtl.getArticle)
/* 新建一篇文章 */
router.post('/tasks', loginCheck, ArticleCtl.insertArticle)
/* 修改某篇文章 */
router.put('/tasks/:articleId', loginCheck, ArticleCtl.updateArticle)
module.exports = router
