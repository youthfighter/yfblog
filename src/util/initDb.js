/* const mongoose = require('mongoose')
const config = require('../../configs')
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${config.mongodb.ip}:${config.mongodb.port}/${config.mongodb.db}`,{useMongoClient: true})

mongoose. */

const user = require('../dao/UserDao')
const md5 = require('md5')
console.log(md5('123'))