const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ArticleSchema = new Schema({
  title:  String,
  author: String,
  content:   String,
  lastUpdate: { type: Date, default: Date.now },
  createDate: {type: Date, default: Date.now},
  hidden: Boolean
});
module.exports = mongoose.model('Article', ArticleSchema);