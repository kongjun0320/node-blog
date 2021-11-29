const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', 'logs', 'access.log')

const readStream = fs.createReadStream(fileName)

const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0
let sum = 0

rl.on('line', (lineData) => {
  sum++
  if (lineData.indexOf('Chrome') > -1) {
    chromeNum++
  }
})
rl.on('close', () => {
  console.log((chromeNum / sum).toFixed(4))
})
