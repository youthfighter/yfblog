const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;
let UserSchema = new Schema({
  name:  String,
  password: String,
  tell: String,
  email: String,
  role: { type: String, default: '2' },
  disabled: { type: Boolean, default: false }
});
module.exports = mongoose.model('User', UserSchema);