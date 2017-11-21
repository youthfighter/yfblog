const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let Schema = mongoose.Schema
let TaskSchema = new Schema({
  task: String,
  author: String,
  done: {type: Boolean, default: false},
  doneDate: Date,
  createDate: {type: Date, default: Date.now}
})
module.exports = mongoose.model('Task', TaskSchema)