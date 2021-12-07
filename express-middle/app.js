const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  console.log('处理cookie')
  req.cookie = {
    userId: '123'
  }
  next()
})

app.use((req, res, next) => {
  setTimeout(() => {
    req.body = {
      a: 1,
      b: 2
    }
    next()
  }, 1000)
})

app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get /api 路由')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post /api 路由')
  next()
})

app.get('/api/get-cookie', (req, res, next) => {
  console.log('get /api/get-cookie')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.get('/api/get-post-data', (req, res, next) => {
  console.log('get /api/get-post-data')
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('404')
  res.json({
    errno: -1,
    msg: '404 Not Found'
  })
})

app.listen(3700, () => console.log('port 3700'))
