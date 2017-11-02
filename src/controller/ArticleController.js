const moment = require('moment')
const ArticleDao = require('../dao/ArticleDao')
class ArticleController{
    async getAll(ctx){
        try{
            let articles = await ArticleDao.findByParams({})
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
