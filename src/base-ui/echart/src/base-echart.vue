<template>
  <div class="basee-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

//定义props
//withDefaults 为设置默认值，有两个参数，第一个为defineProps的返回值，第二个为默认值
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string //默认为required
    height?: string
  }>(),
  {
    width: '100%',
    height: '400px'
  }
)
// 耦合度太高

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  // const echartInstance = echarts.init(echartDivRef.value)
  // echartInstance.setOption(options) 这里改成下面的
  // echartInstance.setOption(props.options)
  const { setOption } = useEchart(echartDivRef.value!)
  // watchEffect(() => {
  //   setOption(props.options)
  // })
  watchEffect(() => {
    setOption(props.options)
  })
})
</script>

<style scoped></style>
