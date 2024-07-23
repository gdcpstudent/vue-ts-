class LocalCache {
  //本地缓存
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value)) //传过来的可能是一个对象，所以就把他转化为string
    console.log('获取setCache的值', value)
  }

  getCache(key: string) {
    //obj => string => obj先用json.stringify(value)转化为string类型保存起来，然后使用json.parse(value)转化为对象返回出去
    const value = window.localStorage.getItem(key) //获取值，
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
