const Article = require('./src/model/Article')
const mongoose = require('mongoose')
const config = require('./configs.js')
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${config.mongodb.ip}:${config.mongodb.port}/${config.mongodb.db}`,{useMongoClient: true});

Article.find({tags: ['CSS','1']}).then(data=>{
    console.log(data)
})