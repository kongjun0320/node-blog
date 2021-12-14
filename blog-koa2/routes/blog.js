const { getList } = require('../controller/blog')

const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  const data = await getList()
  ctx.body = {
    errno: 0,
    data
  }
})

module.exports = router
