const login = (username, password) => {
  if (username === 'jack' && password === '123') {
    return true
  }
  return false
}

module.exports = {
  login
}
