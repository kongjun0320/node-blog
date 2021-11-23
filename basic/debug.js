const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end('Hello NodeJs')
})

server.listen(3300, () => console.log('running at 3300 port'))
