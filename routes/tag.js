const router = require('koa-router')()
const TagCtl = require('../src/controller/TagController')
const loginCheck = require('../midware/loginCheck')
router.prefix('/api/tags')

/* 获取标签列表 */
router.get('/', loginCheck, TagCtl.getTags)
/* 新建标签 */
router.post('/', loginCheck, TagCtl.insertTag)
/* 删除标签 */
router.delete('/:tagId', loginCheck, TagCtl.deleteTag)

module.exports = router
