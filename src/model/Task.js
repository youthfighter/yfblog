const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let Schema = mongoose.Schema
let TaskSchema = new Schema({
  task: String,
  author: String,
  done: {type: Boolean, default: true},
  createDate: {type: Date, default: Date.now}
})
module.exports = mongoose.model('TaskSchema', loginImageSchema)