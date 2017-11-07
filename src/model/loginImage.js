const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;
let loginImageSchema = new Schema({
  currImage: String,
  imageList:[String],
  updateDate: {type: Date, default: Date.now}
});
module.exports = mongoose.model('loginImage', loginImageSchema);