import axios from 'axios'

//axios的实例对象
// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res.data)
// })
// // 2. get请求，并且传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'zlj',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// // 3.post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 额外补充的Promise中类型的使用
// // Promise本身是可以有类型
// // new Promise<string>((resolve) => {
// //   resolve('abc')
// // }).then((res) => {
// //   console.log(res.length)
// // })

// 4. axios的配置选项
// 4.1全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers

axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})
// 2. get请求，并且传入参数
axios
  .get('/get', {
    params: {
      name: 'zlj',
      age: 18
    },
    // 4.2单独配置
    timeout: 5000
  })
  .then((res) => {
    console.log(res.data)
  })
// 3.post请求
axios
  .post('/post', {
    data: {
      name: 'why',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// 5. axios.all ->多个请求，一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'zlj', age: 18 } }),
    axios.post('/post', { data: { name: 'why', age: 18 } })
  ])
  .then((res) => {
    console.log(res)
    console.log(res[0])
    console.log(res[1])
  })
// 6. axios拦截器
