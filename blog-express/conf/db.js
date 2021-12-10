const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if (env === 'development') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '0320',
    database: 'blog'
  }
  REDIS_CONF = {
    host: 'localhost',
    user: '6379'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '0320',
    database: 'blog'
  }
  REDIS_CONF = {
    host: 'localhost',
    user: '6379'
  }
}

module.exports = MYSQL_CONF
