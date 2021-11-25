const querystring = require('querystring')
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

const serverHandle = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])

  getPostData(req).then(async (postData) => {
    req.body = postData

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
