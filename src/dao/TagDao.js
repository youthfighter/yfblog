const Tag = require('../model/Tag')
const BaseDao = require('./BaseDao')
class TagDao extends BaseDao{
  insert (tag) {
    return new Tag(tag).save()
  }
  delete (_id) {
    return Tag.findByIdAndRemove(_id)
  }
  findTags () {
    return Tag.find({}).lean()
  }
  findById (id) {
    return Tag.findById(id).lean()
  }
}
module.exports = new TagDao()