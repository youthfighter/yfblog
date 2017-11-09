const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;
let ImageSchema = new Schema({
  path: String,
  src: String,
  anthor: String,
  createDate: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Image', ImageSchema);