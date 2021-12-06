const express = require('express')
const router = express.Router()

router.get('/list', function (req, res, next) {
  res.json({
    errno: 0,
    data: [
      {
        id: 1,
        name: 'jack'
      }
    ]
  })
})

module.exports = router
