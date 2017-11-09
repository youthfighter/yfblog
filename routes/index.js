const router = require('koa-router')()

router.all('/abc', async (ctx, next) => {
  console.log('-----------------all-------------------')
  next()
})
module.exports = router
