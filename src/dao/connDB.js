const mongoose = require('mongoose');
const config = require('../../configs.js');
mongoose.Promise = global.Promise;
let url = `mongodb://${config.mongodb.ip}:${config.mongodb.port}/${config.mongodb.db}`
mongoose.connect(url,{useMongoClient: true});
module.exports = mongoose.connection;