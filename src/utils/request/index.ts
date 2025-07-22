import axios from 'axios'
import { getToken } from '@/utils/auth/index'
import { showMessage } from './status'
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
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
  },
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return response.data
    } else {
      showMessage(response.data)
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

const request = (data: any): Promise<Api.Response> => {
  return service(data)
}
export const get = <T = Api.Response>(
  url: string,
  params?: any,
): Promise<T> => {
  return service.get(url, { params })
}

export const post = <T = Api.Response>(url: string, data?: any): Promise<T> => {
  return service.post(url, data)
}

export const put = <T = Api.Response>(url: string, data?: any): Promise<T> => {
  return service.put(url, data)
}

export const del = <T = Api.Response>(
  url: string,
  params?: any,
): Promise<T> => {
  return service.delete(url, { params })
}
// // GET
// get('/user/list', { page: 1 }).then(res => {
//   console.log(res)
// })

// // POST
// post('/user/create', { name: 'Tom' }).then(res => {
//   console.log(res)
// })

// // PUT
// put('/user/update', { id: 1, name: 'Jerry' }).then(res => {
//   console.log(res)
// })

// // DELETE
// del('/user/delete', { id: 1 }).then(res => {
//   console.log(res)
// })
export default request
