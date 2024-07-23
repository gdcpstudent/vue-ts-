import { createApp, createVNode } from 'vue'
import App from './App.vue'

import store from './store'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import { setupStore } from './store'
import { globalRegister } from './global'

// import './service/axios_demo'
// import ljRequest from './service'

// ljRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   showLoading: false,
//   interceptors: {
//     reqestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responceInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// ljRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

setupStore()
const app = createApp(App)
app.use(store)
app.use(router)
app.use(globalRegister)

app.mount('#app')
