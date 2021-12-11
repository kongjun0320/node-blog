import request from '@/utils/request'

export default {
  getBlogList(data) {
    return request({
      url: '/blog/list',
      method: 'get',
      data
    })
  },
  getBlogDetail(data) {
    return request({
      url: '/blog/detail',
      method: 'get',
      data
    })
  },
  login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  createBlog(data) {
    return request({
      url: '/blog/new',
      method: 'post',
      data
    })
  },
  deleteBlog(data) {
    return request({
      url: '/blog/del',
      method: 'post',
      data
    })
  }
}
