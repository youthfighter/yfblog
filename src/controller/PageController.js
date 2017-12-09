const PageDao = require('../dao/PageDao')
const utils = require('../util/utils')
const log4js = require('../util/log4').getLogger('blog')
class PageController {
  async insertPage (ctx) {
    try {
      let {title, hidden = false, href = '', parentId} = ctx.request.body
      if (!title) {
        throw { status: 500, errCode: 'need.page.title' }
      }
/*       if (!parentId) {
        throw { status: 500, errCode: 'need.page.parentId' }
      } */
      let index = await PageDao.countByParentId(parentId)
      ctx.body = await PageDao.insert({title, hidden, href, parentId, index})
    } catch (e) {
      if (e) {
        log4js.error(e)
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  async deletePage (ctx) {
    try {
      let id = ctx.params.id
      if (!id) {
        throw { status: 500, errCode: 'need.page.id' }
      }
      ctx.body = await PageDao.delete(id)
    } catch (e) {
      if (e) {
        log4js.error(e)
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  async updatePage (ctx) {
    try {
      let _id = ctx.params.id
      let {title, hidden = false, href = '', parentId} = ctx.request.body
      if (!_id) {
        throw { status: 500, errCode: 'need.page.id' }
      }
      if (!title) {
        throw { status: 500, errCode: 'need.page.title' }
      }
      ctx.body = await PageDao.update({_id, title, hidden, href, parentId})
    } catch (e) {
      if (e) {
        log4js.error(e)
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    } 
  }
  async getPages (ctx) {
    try {
      let pages = await PageDao.findByParams({})
      ctx.body = pages
    } catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
}
module.exports = new PageController()