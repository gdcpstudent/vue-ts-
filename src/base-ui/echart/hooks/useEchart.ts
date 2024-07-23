import * as echarts from 'echarts'

import ChinaMapData from '../data/china.json'
echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el)

  // 设置配置项
  const setOption = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }
  const updateSize = () => {
    echartsInstance.resize()
  }
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  //将两个导出去，使用对象类型导出去，到时候导入可以只导一个
  return {
    setOption,
    echartsInstance,
    updateSize
  }
}
