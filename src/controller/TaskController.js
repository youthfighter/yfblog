const TaskDao = require('../dao/TaskDao')
const utils = require('../util/utils')
const log4js = require('../util/log4').getLogger('blog')
class TaskController{
  async getTasks (ctx) {
    try {
      const { done = false, page = 1, size = 20} = ctx.query
      const author = ctx.session.user.name
      let total = await TaskDao.findTotalByParams({done, author})
      let tasks = []
      if (total > 0) {
        tasks = await TaskDao.findPageByParams({done, author}, page, size)
      }
      ctx.body = {
        toDoList: tasks,
        total
      }
    } catch (e) {
      if (e) {
        log4js.error(e)
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
      else throw { status: 403, errCode: 'task.not.found', }      
    } catch (e) {
      if (e) {
        log4js.error(e)
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
      if (task && task.author === userName) {
        task.done = true
        task.doneDate = new Date()
      } else {
        throw { status: 403, errCode: 'need.task.permission' }
      }
      ctx.body = await TaskDao.update(task)
    } catch (e) {
      if (e) {
        log4js.error(e)
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }     
    }
  }
  async insertTask (ctx) {
    try {
      const author = ctx.session.user.name
      const { task } = ctx.request.body
      if (!task) throw { status: 500, errCode: 'task.cant.null' }
      ctx.body = await TaskDao.insert({author, task})
    } catch (e) {
      if (e) {
        log4js.error(e)
        let info = utils.catchError(e)
        ctx.status = info.status
        ctx.body = info.body
      }
    }
  }
}
module.exports = new TaskController()
