const querystring = require('querystring')
const { access } = require('./utils/log')
const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk + ''
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const SESSION_DATA = {}

const serverHandle = (req, res) => {
  // 记录 access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
  
  res.setHeader('Content-Type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]
  // query
  req.query = querystring.parse(url.split('?')[1])
  // cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie
  if (cookieStr) {
    cookieStr.split(';').forEach((c) => {
      const [key, value] = c.split('=')
      req.cookie[key.trim()] = value
    })
  }

  let needSetCookie = false
  // session
  let userId = req.cookie.userId
  if (userId) {
    needSetCookie = false
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
    req.session = SESSION_DATA[userId]
  }
  // body
  getPostData(req).then(async (postData) => {
    req.body = postData

    if (needSetCookie) {
      res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly`)
    }

    const blogData = await handleBlogRouter(req, res)
    if (blogData) {
      res.end(JSON.stringify(blogData))
      return
    }

    const userData = await handleUserRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return
    }

    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })
    res.write('Not Found \n')
    res.end()
  })
}

module.exports = serverHandle
