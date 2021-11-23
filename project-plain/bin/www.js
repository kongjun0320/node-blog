const http = require('http')
const serverHandle = require('../app')

const PORT = 3300

const server = http.createServer(serverHandle)

server.listen(PORT, () => console.log(`server is running at ${PORT} port`))
