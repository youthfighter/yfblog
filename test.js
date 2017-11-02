const Article = require('./src/model/Article');
const ArticleDao = require('./src/dao/ArticleDao');

let a = new Article({
    title: 'title',
    author: 'youthfighter',
    content: 'content',
    hidden: false
});

let bb = ArticleDao.findByParams({})
console.log(bb)
/*Article.findOne({ title: '123'})
    .then(data=>{
        if(data){
            data.title='234';
        }else{
            throw '未找到相应数据';
        }
        return data;
    })
    .then(data=>{
        return ArticleDao.update(data);
    })
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    })*/
