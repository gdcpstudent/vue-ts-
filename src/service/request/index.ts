import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LJRequestInterceptors, LJRequestConfig } from './type'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'
import { ElLoading } from 'element-plus'

class LJRequest {
  loading?: LoadingInstance

  //以下代码是给LJRequest添加自己的拦截器
  //这样的好处是让别人给我传入实例的时候，能传入一些拦截器，让每个实例都有自己的拦截器
  instance: AxiosInstance
  interceptors?: LJRequestInterceptors
  showLoading: boolean
  constructor(config: LJRequestConfig) {
    this.showLoading = config.showLoading ?? true
    //创建constructe目的是，当new两个LJRequest的时候实例的时候，就能创建两个实例，并且两个实例之间不会相互干扰，不过我们一般只创建一个实例，一个实例请求一个服务器
    this.instance = axios.create(config)
    //interceptors 拦截器
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCache
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responceInterceptor,
      this.interceptors?.responceInterceptorCache
    )

    //添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求拦截成功')
        // this.loading = ElLoading.service({
        //   //把loading保存起来
        //   lock: true,
        //   text: '正在请求数据...',
        //   background: 'rgba(0,0,0,0.5)'
        // })
        return config
      },
      (err) => {
        // console.log('所有实例都有的拦截器：请求拦截失败')
        return err
      }
    )
    //全局响应
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都有的拦截器：响应拦截成功', res)
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        const data = res.data
        //失败情况1：响应成功了，但是data里面的数据为空，或者没有传过来
        // if (data.returnCode === '-1001') {
        //   console.log('请求失败~, 错误信息')
        // } else {
        return data //data里面才是我们需要的数据，先把数据拦截，然后把data取出来
        // }
      },
      (err) => {
        this.loading?.close()
        //失败情况2
        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误信息~')
        }
        // console.log('所有实例都有的拦截器：响应拦截失败')
        return err
      }
    )
  }

  // request(config: AxiosRequestConfig): void { //这里我们把AxiosRequestConfig改成了LJRequestConfig
  //   this.instance.request(config).then((res) => {
  //     console.log(res.data)
  //   })
  // }
  request<T = any>(config: LJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        // config = config.interceptors.requestInterceptor(config)
      }
      // this.instance.request(config).then((res) => {
      //   console.log(res)
      // })
      //2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responceInterceptor) {
            // eslint-disable-next-line
            res = config.interceptors.responceInterceptor(res)
            console.log(res)
          }
          //3.将结果resolve返回出去
          resolve(res)
          this.showLoading = true
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: LJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: LJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: LJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: LJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default LJRequest
