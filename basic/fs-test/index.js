const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// fs.readFile(fileName, (error, data) => {
//   if(error)
//    throw error
//    console.log(data.toString())
// })

// const opt = {
//   flag: 'a'
// }
// const content = 'I am coming \n'
// fs.writeFile(fileName, content, opt, (error) => {
//   if(error)
//   throw error
// })

fs.exists(fileName, (isExist) => {
  console.log('isExist >>> ', isExist)
})
