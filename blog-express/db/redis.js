const { createClient } = require('redis')

const client = createClient()

client.on('error', (err) => console.log('Redis Client Error', err))

client.connect()

const set = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  client.set(key, value)
}

const get = (key) => {
  return new Promise(async (resolve, reject) => {
    const value = await client.get(key)
    if (!value) {
      reject(value)
      return
    }
    try {
      resolve(JSON.stringify(value))
    } catch (error) {
      console.log(error)
      resolve(value)
    }
  })
}

module.exports = {
  get,
  set
}
