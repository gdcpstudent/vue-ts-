<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品销量(饼图)">
          <pie-echarts :pieData="goodsCount"></pie-echarts>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)">
          <rose-echarts :roseData="goodsCount"></rose-echarts>
        </hy-card>
      </el-col>
    </el-row>
    <div class="buttom-echarts">
      <el-row :gutter="10">
        <el-col :span="12">
          <hy-card title="分类商品的销量">
            <line-echarts v-bind="categoryGoodsSale"></line-echarts>
          </hy-card>
        </el-col>
        <el-col :span="12">
          <hy-card title="分类商品数量">
            <bar-echarts v-bind="categoryGoodsFavor"></bar-echarts>
          </hy-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import HyCard from '@/base-ui/card'
import { userStore } from '@/store'
// import { useStore } from '@/store/index
// import baseEchart from '@/base-ui/echart'
import {
  pieEcharts,
  roseEcharts,
  lineEcharts,
  barEcharts,
  mapEchart
} from '@/components/page-echart'
export default defineComponent({
  name: 'dashboard',
  components: {
    HyCard,
    // baseEchart
    pieEcharts,
    roseEcharts,
    lineEcharts,
    barEcharts,
    mapEchart
  },
  setup() {
    const store = userStore()
    //请求数据
    store.dispatch('dashboard/getDashboardDataAction')
    // const options = {
    //   xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: [150, 230, 224, 218, 135, 147, 260],
    //       type: 'line'
    //     }
    //   ]
    // }
    // return { options }
    const goodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      console.log('xLabels', xLabels)
      console.log('categoryGoodsFavor', categoryGoodsFavor)

      return { xLabels, values }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      goodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.echarts {
  width: 600px;
  height: 400px;
}
.buttom-echarts {
  margin-top: 10px;
}
</style>
