const router = require('koa-router')()
const TaskCtl = require('../src/controller/TaskController')
const loginCheck = require('../midware/loginCheck')
router.prefix('/api/tasks')

/* 获取任务 */
router.get('/', loginCheck, TaskCtl.getTasks)
/* 获取某个 */
router.get('/:taskId', loginCheck, TaskCtl.getTask)
/* 新建任务 */
router.post('/', loginCheck, TaskCtl.insertTask)
/* 设置任务已完成 */
router.patch('/:taskId', loginCheck, TaskCtl.setTaskDone)
/* 删除任务 */
router.delete('/:taskId', loginCheck, TaskCtl.deleteTask)

module.exports = router
