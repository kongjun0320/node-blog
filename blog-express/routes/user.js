const express = require('express')
const router = express.Router()

router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  res.json({
    errno: 0,
    username,
    password
  })
})

module.exports = router
