const mongoose = require('mongoose');
const config = require('../../configs.js');

class BaseDao{
    constructor(){
        mongoose.Promise = global.Promise;
        mongoose.connect(`mongodb://${config.mongodb.ip}:${config.mongodb.port}/${config.mongodb.db}`,{useMongoClient: true});
    }
}
module.exports = BaseDao;