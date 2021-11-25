const { exec } = require('../../db/mysql')

const login = async (username, password) => {
  const sql = `select * from users where username = '${username}' and password = '${password}'`
  const result = await exec(sql)

  return result[0] || {}
}

module.exports = {
  login
}
