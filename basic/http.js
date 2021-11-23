const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  console.log(method, path)
  const query = querystring.parse(url.split('?')[1])

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(query))
})

server.listen(3300, () => console.log('3300 port'))
