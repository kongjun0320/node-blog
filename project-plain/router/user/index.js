const { login } = require('../../controller/user')
const { set } = require('../../db/redis')
const { SuccessModel, ErrorModel } = require('../../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

const handleUserRouter = async (req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = await login(username, password)

    if (result.username) {
      // 设置session
      req.session.username = username
      // 同步到redis
      set(req.sessionId, req.session)

      // path为/表示当前域名下所以地址都可访问，比如:path为/a 只有此地址可以访问
      // res.setHeader(
      //   'Set-Cookie',
      //   `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`
      // )
      return new SuccessModel()
    }
    return new ErrorModel('用户名、密码错误')
  }

  if (method === 'GET' && req.path === '/api/login-test') {
    console.log(req.session)
    if (req.session.username) {
      return Promise.resolve(new SuccessModel())
    }
    return Promise.resolve(new ErrorModel('未登录'))
  }
}

module.exports = handleUserRouter
