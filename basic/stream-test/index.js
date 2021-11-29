//! input/output
// process.stdin.pipe(process.stdout)

// !server
// const http = require('http')

// const server = http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     req.pipe(res)
//   }
// })

// server.listen(3300, () => console.log('port 3300'))

// ! copy file

const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, 'source.txt')
const fileNameTarget = path.resolve(__dirname, 'target.txt')

const rs = fs.createReadStream(fileName)
const ws = fs.createWriteStream(fileNameTarget)

rs.pipe(ws)

rs.on('end', () => console.log('end'))
