const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1 = 1 `
  if (author) {
    sql += ` and author = ${author} `
  }
  if (keyword) {
    sql += ` and keyword = ${keyword} `
  }

  const result = await exec(sql)
  return result
}

module.exports = {
  getList
}
