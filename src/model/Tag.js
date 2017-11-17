const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let Schema = mongoose.Schema
let TagSchema = new Schema({
  name: String,
  author: String,
  createDate: {type: Date, default: Date.now}
})
module.exports = mongoose.model('Tag', TagSchema)