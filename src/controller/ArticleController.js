const moment = require('moment')
const ArticleDao = require('../dao/ArticleDao')
const utils = require('../util/utils')
const Session = require('../util/session')
const marked = require('marked')
const htmlUtil = require('../util/html')
const pinyin = require("pinyin")
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
      if (tags && tags.split(',').length > 0) {
        tags.split(',').forEach(value => {
          articleTags.push({
            'name': pinyin(value, {style: pinyin.STYLE_NORMAL}).join(''),
            'value': value
          })
        })
      }
      ctx.body = await ArticleDao.insert({
        title,
        content,
        author: ctx.session.user.name,
        tags: articleTags
      })
    } catch (e) {
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
      if (article.author !==ctx.session.user.name) throw { status: 403, errCode: 'need.article.permission' }
      article.title = params.title
      article.content = params.content
      article.hidden = params.hidden
      if (params.tags && params.tags.split(',').length > 0) {
        article.tags = []
        params.tags.split(',').forEach(value => {
          article.tags.push({
            'name': pinyin(value, {style: pinyin.STYLE_NORMAL}).join(''),
            'value': value
          })
        })
      }
      ctx.body = await ArticleDao.update(article)
    } catch (e) {
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }  
  }
  /* 获取所有文章 */
  async getArticles(ctx){
    try{
      let params = {}
      let {page = 1, size = 20, author} = ctx.query
      if (author) params.author = author
      let articles = await ArticleDao.findPageByParams(params, parseInt(page), parseInt(size))
      articles.forEach((value,index)=>{
          let mt = moment(value.createDate)
          value.year = mt.format('YYYY')
          value.monthDay = mt.format('MM-DD')
          value.fmCreateDate = mt.format('YYYY-MM-DD')
          let mt2 = moment(value.createDate)
          value.fmLastUpdate = mt2.format('YYYY-MM-DD')
          value.html = marked(value.content)
          value.description = `${htmlUtil.getText(value.html).substr(0,200)}...`
      })
      ctx.body = {
        articles,
        total: articles.length
      }
    }catch (e) {
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  /* 获取某一篇文章 */
  async getArticle(ctx){
    try{
      let id = ctx.params.articleId
      let result = await ArticleDao.findById(id)
      let browsingAmount = isNaN(result.browsingAmount) ? 0 : result.browsingAmount
      result.browsingAmount = browsingAmount + 1
      await ArticleDao.update(result)
      if (!result) throw { status: 401, errCode: 'article.not.found' }
      result.publishDatetime = moment(result.createDate).format('YYYY年MM月DD日 HH:mm:ss')
      result.html = marked(result.content)
      ctx.body = result
    }catch (e) {
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
}

module.exports = new ArticleController()
