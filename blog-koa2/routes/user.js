const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  ctx.body = {
    errno: 0,
    data: ['list'],
    body: ctx.request.body
  }
})

router.get('/session-test', async (ctx, next) => {
  if (!ctx.session.count) {
    ctx.session.count = 1
  } else {
    ctx.session.count++
  }
  ctx.body = {
    errno: 0,
    count: ctx.session.count
  }
})

module.exports = router
