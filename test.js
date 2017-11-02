const Article = require('./src/model/Article');
const db = require('./src/dao/connDB');
const ArticleDao = require('./src/dao/ArticleDao');

let a = new Article({
    title: 'title',
    author: 'youthfighter',
    content: 'content',
    hidden: false
});

for(let i=0;i<30;i++){
    let a = new Article({
        title: i,
        author: 'youthfighter',
        content: 'content',
        hidden: false
    });
    a.save()
}
ArticleDao.findByParamsAndPage({},10,1)
    .then(data=>{
        console.log(data);
    })
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
