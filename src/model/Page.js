const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;
let PageSchema = new Schema({
  title:  String,
  hidden: { type: Boolean, default: false },
  href: String,
  index: { type: Number, default: 0 },
});
module.exports = mongoose.model('User', PageSchema);