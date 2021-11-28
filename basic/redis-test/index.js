const { createClient } = require('redis')

;(async () => {
  const client = createClient()

  client.on('error', (err) => console.log('Redis Client Error', err))

  await client.connect()

  await client.set('test1', 'test1')
  const value = await client.get('test1')
  console.log('test1: ', value)
})()
