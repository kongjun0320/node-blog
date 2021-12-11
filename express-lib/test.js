const express = require('./index')

const app = express()

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  console.log('处理cookie...')
  req.cookie = {
    userId: '123'
  }
  next()
})

app.use('/api', (req, res, next) => {
  console.log('处理 /api 请求')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get /api 请求')
  next()
})

function loginCheck(req, res, next) {
  setTimeout(() => {
    console.log('模拟登陆成功')
    next()
  }, 0)
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookie')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.listen(8000, () => console.log('port 8000'))
