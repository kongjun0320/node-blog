const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '1',
      content: 'content',
      createTime: 123,
      author: 'jack'
    },
    {
      id: 2,
      title: '1',
      content: 'content',
      createTime: 123,
      author: 'tom'
    }
  ]
}

const getDetail = (id) => {
  console.log(id)
  return {
    id: 2,
    title: '1',
    content: 'content',
    createTime: 123,
    author: 'tom'
  }
}

const newBlog = (blogData = {}) => {
  console.log(blogData)
  return {
    id: 3
  }
}
const updateBlog = (id, blogData = {}) => {
  console.log(id, blogData)
  return true
}

const delBlog = (id) => {
  console.log(id)
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
