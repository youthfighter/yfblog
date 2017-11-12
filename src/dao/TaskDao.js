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
  findById (id) {
      return Task.findById(id).lean()
  }
  findByParams (params) {
      return Task.find(params).sort({createDate:-1}).lean()
  }
}
module.exports = new TaskDao()