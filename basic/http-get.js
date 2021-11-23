const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const url = req.url
  req.query = querystring.parse(url.split('?')[1])
  res.end(JSON.stringify(req.query))
})

server.listen(3300, () => console.log('server is running at 3300 port'))
