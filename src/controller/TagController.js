const TagDao = require('../dao/TagDao')
const utils = require('../util/utils')
class TagController{
  async getTags (ctx) {
    try {
      let tags = await TagDao.findTags()
      ctx.body = {
        tags,
        total: tags.length
      }
    } catch (e) {
      if (e) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  async deleteTag (ctx) {
    try {
      const _id = ctx.params.tagId
      ctx.body = await TagDao.delete(_id)
    } catch (e) {
      if (e) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  async insertTag (ctx) {
    try {
      const { name } = ctx.request.body
      if (!name) throw { status: 500, errCode: 'need.tag.name' }
      const author = ctx.session.user.name
      ctx.body = await TagDao.insert({name, author})
    } catch (e) {
      if (e) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
}
module.exports = new TagController()
