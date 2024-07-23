import {
  // InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
export interface LJRequestInterceptors<T = AxiosResponse> {
  //接口这里定义了泛型默认为AxiosResponse，这样外界来调用的时候就不用定义类型，而是默认为AxiosResponse
  //请求成功拦截
  requestInterceptor?: (
    //拦截器是可选的，可以选择使用或者不使用
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  //请求失败拦截
  requestInterceptorCache?: (error: any) => any
  //响应成功拦截
  responceInterceptor?: (res: T) => T //因为这里无法直接使用泛型，所以从引入接口接收默认的AxiosResponse类型，外界也可以传入其他类型

  //响应失败拦截
  responceInterceptorCache?: (error: any) => any
}
export interface LJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LJRequestInterceptors<T>
  showLoading?: boolean
}
