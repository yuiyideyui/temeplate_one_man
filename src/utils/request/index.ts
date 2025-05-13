import axios from 'axios'
import { getToken } from '@/utils/auth/index'
import { ElMessage } from 'element-plus'
import { showMessage } from './status'
// import { BACKEND_URL } from '../env'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const service = axios.create({
  baseURL: BACKEND_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// 发起请求之前的拦截器
service.interceptors.request.use(
  async (config: any) => {
    if (!config.data) {
      config.data = {}
    }
    config.headers['Authorization'] = 'Bearer ' + getToken()
    config.headers['platform'] = 'WEB'
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      showMessage(response.data)
      return response.data
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      return Promise.reject(response.data)
    }
    // ElMessage.error('网络连接异常,请稍后再试!')
  },
)

const request = (data: any): Promise<ApiResponse> => {
  return service(data)
}
export default request
