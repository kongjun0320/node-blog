const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../../controller/blog')
const { SuccessModel, ErrorModel } = require('../../model/resModel')

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
    const data = await newBlog({ ...body, author: 'mike' })
    return new SuccessModel(data)
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = await updateBlog(id, body)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新博客失败')
    }
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    const author = 'mike'
    const result = await delBlog(id, author)

    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleBlogRouter
