const serverHandle = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const resData = {
    name: 'aicherish',
    age: 25,
    env: process.env.NODE_ENV
  }

  res.end(JSON.stringify(resData))
}

module.exports = serverHandle