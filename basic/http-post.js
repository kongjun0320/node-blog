const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.headers['content-type'])
  let postData = ''

  req.on('data', (chunk) => {
    postData += chunk + ''
  })
  req.on('end', () => {
    res.end(postData)
  })
})

server.listen(3700, () => console.log('port 3300'))
