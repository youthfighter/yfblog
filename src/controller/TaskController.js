const TaskDao = require('../dao/TaskDao')
const utils = require('../util/utils')
class TaskController{
  async getTasks (ctx) {
    try {
      const { done = false } = ctx.query
      const author = ctx.session.user.name
      let tasks = await TaskDao.findByParams({done, author})
      ctx.body = tasks
    } catch (e) {
      if (err) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  async getTask (ctx) {
    try {
      const id = ctx.params.taskId
      const userName = ctx.session.user.name
      let task = await TaskDao.findById(id)
      if (task && task.author === userName) ctx.body = task
      else ctx.body = ''      
    } catch (e) {
      if (err) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
  async setTaskDone (ctx) {
    try {
      const id = ctx.params.taskId
      const userName = ctx.session.user.name
      let task = await TaskDao.findById(id)
      if (task && task.author === userName) task.done = true
      else throw { status: 403, errCode: 'need.task.permission' }
      ctx.body = await TaskDao.update(task)
    } catch (e) {
      if (err) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }     
    }
  }
  async insertTask (ctx) {
    try {
      const author = ctx.session.user.author
      const { task } = ctx.request.body
      if (task) throw { status: 500, errCode: 'task.cant.null' }
      ctx.body = await TaskDao.update({author, task})
    } catch (e) {
      if (err) {
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
}
module.exports = new TaskController()
