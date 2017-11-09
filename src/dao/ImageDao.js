const Image = require('../model/Image');
const BaseDao = require('./BaseDao');
class ImageDao extends BaseDao{
  insert (image) {
    return new Image(image).save();
  }
  findOne (id) {
    return Image.findById(id).lean();
  }
  findByPath (path) {
    return Image.find({path}).lean()
  }
}
module.exports = new ImageDao();