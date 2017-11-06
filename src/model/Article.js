const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;
let ArticleSchema = new Schema({
  title:  String,
  author: String,
  content:   String,
  lastUpdate: { type: Date, default: Date.now },
  createDate: {type: Date, default: Date.now},
  hidden: {type: Boolean, default: false}
});
module.exports = mongoose.model('Article', ArticleSchema);