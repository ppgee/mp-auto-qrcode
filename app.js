const Koa = require('koa')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')

// 路由
const qrcode = require('./controllers/qrcode')

// 创建koa实例
const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// routes
app.use(qrcode.routes(), qrcode.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(4444)