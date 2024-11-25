import axios from 'axios'
import { getToken } from '@/utils/auth/index'
import { ElMessage } from 'element-plus'
import { showMessage } from './status'
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
})

// axios实例拦截请求
request.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      showMessage(response)
      return response
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status)
      return Promise.reject(response.data)
    }
    // ElMessage.error('网络连接异常,请稍后再试!')
  },
)

export default request
