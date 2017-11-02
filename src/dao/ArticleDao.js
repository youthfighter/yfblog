const Article = require('../model/Article');
const BaseDao = require('./BaseDao');
class ArticleDao extends BaseDao{
    insert(article){
        return new Article(article).save();
    }
    update(params){
        let _id = params._id;
        return Article.update({_id},params);
    }
    findById(_id){
        return Article.findOne({_id}).lean();
    }
    findByParams(params){
        return Article.find(params).sort({createDate:-1}).lean()
    }
    findPageByParams(params,pageNum,limit){
        return Article.find(params).sort({createDate:-1}).limit(pageNum).skip(pageNum*limit).lean()
    }
}
module.exports = new ArticleDao();