import router from '@/router'
import { ElMessage } from 'element-plus'
export const showMessage = (data: any) => {
  let message = '';
  switch (data.code) {
    case 400:
    case 4000000:
      // message = '请求错误(400)';
      message = data.msg
      break;
    case 401:
      message = '未授权，请重新登录(401)';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '系统异常';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    case 40031:
        router.push('./login')
      break;
    case 4003:
        router.push('./login')
      break;
    case 5100001:
      message = data.msg
      break;
    case 5200001:
      message = '';
      break;
    default:
      message = `系统异常`;
  }
  if (data.code !== 0 && message) ElMessage.error(message)
  return `${message}，请检查网络或联系管理员！`;
};
