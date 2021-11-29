const crypto = require('crypto')

const SECRET_KEY = 'SECRET_KEY'

function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

function getPassword(password) {
  const str = `${password}${SECRET_KEY}`
  return md5(str)
}

console.log(getPassword('123'));
