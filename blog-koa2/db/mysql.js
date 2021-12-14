const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0320',
  database: 'blog'
})

connection.connect()

const exec = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec
}
