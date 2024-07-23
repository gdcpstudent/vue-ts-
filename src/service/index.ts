// service 统一出口
import LJRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
const ljRequest = new LJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      //携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}` //Bearer信使的意思
        // console.log('这这这拦截成功的config', config)
      }
      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCache(error) {
      // console.log('请求失败的拦截')
      return error
    },
    responceInterceptor(res) {
      // console.log('响应成功的拦截')
      return res
    },
    responceInterceptorCache(error) {
      // console.log('响应失败的拦截')
      return error
    }
  }
})
export default ljRequest
