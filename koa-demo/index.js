const Koa = require('koa')

const app = new Koa()

app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
  console.log('use')
})

app.listen(3000)
