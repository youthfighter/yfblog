const Article = require('../model/Article')
const BaseDao = require('./BaseDao')
const mongoose = require('mongoose')
class ArticleDao extends BaseDao{
    insert (article) {
        return new Article(article).save();
    }
    update (params) {
        let _id = params._id
        delete params._id
        return Article.update({_id}, params)
    }
    findById (id) {
        return Article.findById(id).lean()
    }
    findPageByParams (params, pageNum, limit) {
        return Article.find(params).sort({createDate:-1}).limit(limit).skip((pageNum-1)*limit).lean()
    }
    findTop (sort, num, params = {}) {
        let _sort
        if (typeof sort === 'string') _sort = {[sort]: -1}
        else _sort = sort
        return Article.find(params).sort(_sort).limit(num).lean()
    }
}
module.exports = new ArticleDao();