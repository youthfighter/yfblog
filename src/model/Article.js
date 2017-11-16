const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title:  String,
  author: String,
  content:   String,
  browsingAmount: {type: Number, default: 0},
  tags: [String],
  lastUpdate: { type: Date, default: Date.now },
  createDate: {type: Date, default: Date.now},
  hidden: {type: Boolean, default: false}
});
module.exports = mongoose.model('Article', ArticleSchema);