const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let Schema = mongoose.Schema
let PageSchema = new Schema({
  title:  String,
  hidden: { type: Boolean, default: false },
  href: String,
  index: { type: Number, default: 0 },
  parentId: Schema.Types.ObjectId
})
module.exports = mongoose.model('Page', PageSchema)