const fs = require('fs')
const path = require('path')

function getFile(filename) {
  return new Promise((resolve, reject) => {
    const fullName = path.resolve(__dirname, filename)
    fs.readFile(fullName, (err, res) => {
      const data = JSON.parse(res.toString())
      resolve(data)
    })
  })
}

getFile('a.json')
  .then((data) => {
    console.log(data)
    return getFile(data.next)
  })
  .then((data) => {
    console.log(data)
    return getFile(data.next)
  })
  .then((data) => {
    console.log(data)
  })
