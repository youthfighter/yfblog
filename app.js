const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session');
const cookie = require('./configs').cookie

const index = require('./routes/index')
const imageUpload = require('./routes/imageUpload')
const webSettings = require('./routes/webSettings')
const users = require('./routes/users')
const article = require('./routes/article')
const task = require('./routes/task')
const cookieConfig = require('./configs').cookie
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(session(cookieConfig, app));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${new Date()}:${ctx.method} ${ctx.url} - ${ms}ms`)
})
/* session */
app.use(async (ctx, next) => {
  ctx.session.save()
  await next()
}) 
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(imageUpload.routes(),imageUpload.allowedMethods())
app.use(webSettings.routes(),webSettings.allowedMethods())
app.use(task.routes(),task.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
