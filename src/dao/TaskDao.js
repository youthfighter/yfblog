const Task = require('../model/Task')
const BaseDao = require('./BaseDao')
class TaskDao extends BaseDao{
  insert (task) {
    return new Task(task).save()
  }
  update (params) {
      let _id = params._id
      delete params._id
      return Task.update({_id},params)
  }
  delete (params) {
    return Task.remove(params)
  }
  findById (id) {
      return Task.findById(id).lean()
  }
  findByParams (params) {
      return Task.find(params).sort({createDate:-1}).lean()
  }
  findPageByParams (params, pageNum, limit) {
    return Task.find(params).sort({createDate:-1}).limit(limit).skip((pageNum-1)*limit).lean()
  }
  findTotalByParams (params) {
    return Task.count(params)
  }
}
module.exports = new TaskDao()