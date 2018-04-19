import axios from 'axios'
import { merge } from 'lodash'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  const defaultConfig = {
    baseURL: '',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
  }
  return merge(defaultConfig, config)
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
