const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../../controller/blog')
const { SuccessModel, ErrorModel } = require('../../model/resModel')

const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('未登录'))
  }
}

const handleBlogRouter = async (req, res) => {
  const method = req.method
  const id = req.query.id
  const body = req.body

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const result = await getList(author, keyword)

    return new SuccessModel(result)
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = await getDetail(id)
    return new SuccessModel(data)
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckResult = loginCheck()
    if (loginCheckResult) {
      return loginCheckResult
    }

    const data = await newBlog({ ...body, author: req.session.username })
    return new SuccessModel(data)
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck()
    if (loginCheckResult) {
      return loginCheckResult
    }

    const result = await updateBlog(id, body)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新博客失败')
    }
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck()
    if (loginCheckResult) {
      return loginCheckResult
    }

    const result = await delBlog(id, req.session.username)

    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleBlogRouter
