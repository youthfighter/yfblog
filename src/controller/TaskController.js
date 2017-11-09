const TaskDao = require('../dao/TaskDao')
const utils = require('../util/utils')
class TaskController{
  async getUndoneTask(ctx) {
    try{
      let tasks = await TaskDao.findBydone(false)
      ctx.body = tasks
    } catch(err) {
      if (err) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  async setTaskDone (ctx) {
    try{
      let res = await TaskDao.update({done: true})
      ctx.body = res
    } catch(err) {
      if (err) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  async getDoneTask (ctx) {
    try{
      let tasks = await TaskDao.findBydone(false)
      ctx.body = tasks
    } catch (err) {
      if (err) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body 
      }
    }
  }
  async getOneTask (ctx) {
    try{
      let _id = ctx.params._id
      let task = await TaskDao.findById({_id})
      ctx.body = task
    } catch (err) {
      if (err) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body 
      }
    }
  }
}
module.exports = new TaskController()
