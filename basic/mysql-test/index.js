const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0320',
  database: 'blog'
})

connection.connect()

connection.query(`select * from blogs`, (error, results) => {
  if (error) throw error
  console.log(results)
})

connection.end()
