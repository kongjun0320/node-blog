const e = require('express')
const express = require('express')
const router = express.Router()

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', async (req, res, next) => {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''

  if (req.query.isAdmin) {
    if (!req.session.username) {
      res.json(new ErrorModel('未登录'))
      return
    }

    author = req.session.author
  }

  const result = await getList(author, keyword)

  res.json(new SuccessModel(result))
})

router.get('/detail', async (req, res, next) => {
  const result = await getDetail(req.query.id)
  res.json(new SuccessModel(result))
})

router.post('/new', loginCheck, async (req, res, next) => {
  req.body.author = req.session.username
  const result = await new newBlog(req.body)
  res.json(new SuccessModel(result))
})

router.post('/update', loginCheck, async (req, res, next) => {
  const result = await updateBlog(req.query.id, req.body)
  if (result) {
    res.json(new SuccessModel())
  } else {
    res.json(new ErrorModel('更新博客失败'))
  }
})

router.post('/del', loginCheck, async (req, res, next) => {
  const author = req.session.username
  const result = await delBlog(req.query.id, author)
  if (result) {
    res.json(new SuccessModel())
  } else {
    res.json(new ErrorModel('删除博客失败'))
  }
})

module.exports = router
