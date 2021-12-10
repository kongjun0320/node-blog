const express = require('express')
const router = express.Router()

const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const result = await login(username, password)
  if (result.username) {
    req.session.username = result.username
    req.session.realname = result.realname

    res.json(new SuccessModel())
  } else {
    res.json(new ErrorModel('登陆失败'))
  }
})

router.get('/login-test', async (req, res, next) => {
  if (req.session.username) {
    res.json({
      msg: '登录成功'
    })
  } else {
    res.json({
      msg: '登录失败'
    })
  }
})

module.exports = router
