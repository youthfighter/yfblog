const moment = require('moment')
const ArticleDao = require('../dao/ArticleDao')
const TagDao = require('../dao/TagDao')
const utils = require('../util/utils')
const Session = require('../util/session')
const marked = require('marked')
const htmlUtil = require('../util/html')
const log4js = require('../util/log4').getLogger('blog')
class ArticleController{
  /* 插入文章 */
  async insertArticle (ctx) {
    try {
      let { title, content, tags} = ctx.request.body
      //后端数据验证
      if (!title) {
        throw { status: 500, errCode: 'need.article.title' }
      }
      if (!content){
        throw { status: 500, errCode: 'need.article.content' }
      }
      let articleTags = []
      if (tags) {
        /* 验证tag是否存在 */
        const tagsObj = await TagDao.findTags()
        let tagsArr = tagsObj.map(value => {
          return value.name
        })
        tags.split(',').forEach(value => {
          if (tagsArr.indexOf(value)!==-1) {
            articleTags.push(value)
          }
        })
      }
      ctx.body = await ArticleDao.insert({
        title,
        content,
        author: ctx.session.user.name,
        tags: articleTags
      })
    } catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  /* 文章编辑 */
  async updateArticle (ctx) {
    try {
      let params = ctx.request.body
      let articleId = ctx.params.articleId
      //后端数据验证
      if (!articleId) throw { status: 500, errCode: 'need.article.id' }
      if (!params.title) throw { status: 500, errCode: 'need.article.title' }
      if (!params.content) throw { status: 500, errCode: 'need.article.content' }
      let article = await ArticleDao.findById(articleId)
      if (!article) throw { status: 500, errCode: 'article.has.delete' }
      if (article.author !==ctx.session.user.name) throw { status: 403, errCode: 'need.article.permission' }
      article.title = params.title
      article.content = params.content
      article.hidden = params.hidden
      article.tags = []
      if (params.tags) {
        /* 验证tag是否存在 */
        const tagsObj = await TagDao.findTags()
        let tagsArr = tagsObj.map(value => {
          return value.name
        })
        params.tags.split(',').forEach(value => {
          if (tagsArr.indexOf(value) !== -1) {
            article.tags.push(value)
          } 
        })
      }
      ctx.body = await ArticleDao.update(article)
    } catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }  
  }
  /* 获取所有文章 */
  async getArticles (ctx) {
    try{
      let params = {hidden: false}
      let {page = 1, size = 20, tag } = ctx.query
      if (tag) params.tags = tag
      let total = await ArticleDao.findTotalByParams(params)
      let articles = []
      if (total > 0) {
        articles = await ArticleDao.findPageByParams(params, parseInt(page), parseInt(size))
        articles.forEach((value,index)=>{
            value.html = marked(value.content)
            value.description = `${htmlUtil.getText(value.html).substr(0,200)}...`
        })
      }
      ctx.body = {
        articles,
        total
      }
    }catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  /* 获取所有文章 */
  async getOwnerArticles (ctx) {
    try{
      let params = {}
      let {page = 1, size = 20, author, tag } = ctx.query
      params.author = ctx.session.user.name
      if (tag) params.tags = tag
      let total = await ArticleDao.findTotalByParams(params)
      let articles = []
      if (total > 0) {
        articles = await ArticleDao.findPageByParams(params, parseInt(page), parseInt(size))
      }
      ctx.body = {
        articles,
        total
      }
    }catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  /* 获取某一篇文章 */
  async getArticle (ctx) {
    try{
      let id = ctx.params.articleId
      let result = await ArticleDao.findById(id)
      let browsingAmount = isNaN(result.browsingAmount) ? 0 : result.browsingAmount
      result.browsingAmount = browsingAmount + 1
      await ArticleDao.update(result)
      /* 查询不到结果或者查询结果的hidden属性为true，返回文章未找到 */
      if (!result || result.hidden) throw { status: 401, errCode: 'article.not.found' }
      result.html = marked(result.content)
      ctx.body = result
    }catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  /* 获取某一篇文章 */
  async getOwnerArticle (ctx) {
    try{
      let id = ctx.params.articleId
      let result = await ArticleDao.findById(id)
      if (!result) throw { status: 401, errCode: 'article.not.found' }
      result.html = marked(result.content)
      ctx.body = result
    }catch (e) {
      log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  /* 获取点击量最多的文章 */
  async getHotArticles (ctx) {
    try {
      let articles = await ArticleDao.findTop('browsingAmount', 3)
      ctx.body = {articles}
    } catch (err) {
      if (err) {
        log4js.error(e)
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
      }
    }
  }
  /* 获取最新文章 */
  async getNewArticles (ctx) {
    try {
      let articles = await ArticleDao.findTop('createDate', 3)
      ctx.body = {articles}
    } catch (err) {
      if (err) {
        log4js.error(e)
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
}

module.exports = new ArticleController()
