import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

service.interceptors.request.use((req) => {
  return req
})

service.interceptors.response.use((res) => {
  const { errno, data, message } = res.data
  if (errno === 0) {
    return data
  } else {
    return Promise.reject(message || '系统维护中，请稍后重试。')
  }
})

const request = (options) => {
  options.method = options.method || 'get'

  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }

  return service(options)
}

export default request
