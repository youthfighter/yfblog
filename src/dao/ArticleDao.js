const Article = require('../model/Article');
class ArticleDao{
    insert(article){
        return new Article(article).save();
    }
    update(params){
        let _id = params._id;
        return Article.update({_id},params);
    }
    findById(_id){
        return Article.findOne({_id});
    }
    findByParams(params){
        return Article.find(params);
    }
    findPageByParamsAnd(params,pageNum,limit){
        return Article.find(params).limit(pageNum).skip(pageNum*limit)
    }
}
module.exports = new ArticleDao();