const moment = require('moment')
const ArticleDao = require('../dao/ArticleDao')
const utils = require('../util/utils')
const Session = require('../util/session')
class ArticleController{
  async insertArticle (ctx) {
    try {
      let sei = new Session(ctx)
      //判断用户时候登录
      if (!sei.getUser()) {
        throw { status: 401, errCode: 'user.not.login' }
      } 
      let { title, content} = ctx.request.body
      //后端数据验证
      if (!title) {
        throw { status: 500, errCode: 'need.article.title' }
      }
      if (!content){
        throw { status: 500, errCode: 'need.article.content' }
      }
      ctx.body = await ArticleDao.insert({
        title,
        content,
        author: sei.getUserName()
      })
    } catch (e) {
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }
  }
  async updateArticle (ctx) {
    try {
      let sei = new Session(ctx)
      //判断用户时候登录
      let userName
      if (!sei.getUser()) {
        throw { status: 401, errCode: 'user.not.login' }
      }
      let params = ctx.request.body
      //后端数据验证
      if (!params._id) {
        throw { status: 500, errCode: 'need.article._id' }
      }
      if (!params.title) {
        throw { status: 500, errCode: 'need.article.title' }
      }
      if (!params.content){
        throw { status: 500, errCode: 'need.article.content' }
      }
      params.author = sei.getUserName()
      ctx.body = await ArticleDao.insert(params)
    } catch (e) {
      let info = utils.catchError(e)
      ctx.status = info.status
      ctx.body = info.body
    }  
  }
  async getAll(ctx){
      try{
          let articles = await ArticleDao.findByParams({hidden:false})
          articles.forEach((value,index)=>{
              let mt = moment(value.createDate)
              value.year = mt.format('YYYY')
              value.monthDay = mt.format('MM-DD')
          })
          ctx.body = articles
      }catch (e) {
          ctx.status = 404
          ctx.body = e
      }
  }
  async getOne(ctx){
      try{
          let _id = ctx.params.id
          let result = await ArticleDao.findById({_id})
          result.nn = moment(result.createDate).format('YYYY年MM月DD日 HH:mm:ss')
          ctx.body = result
      }catch (e) {
          ctx.status = 404
          ctx.body = '该文章不存在'
      }
  }
}

module.exports = new ArticleController()
