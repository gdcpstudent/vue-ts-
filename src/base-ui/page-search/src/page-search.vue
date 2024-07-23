<template>
  <div class="page-search">
    <lj-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="title">高级检索</h1>
      </template>
      <template #footer>
        <div class="btn-reset-search">
          <el-button type="primary" @click="handleSearchClick"
            ><el-icon><Search /></el-icon>搜索</el-button
          >
          <el-button @click="handleResetClick"
            ><el-icon><Refresh /></el-icon>重置</el-button
          >
        </div>
      </template>
    </lj-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import LjForm from '@/base-ui/form'

export default defineComponent({
  components: { LjForm, Refresh, Search },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },

  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    //双向绑定的属性应该是由配置文件的field来决定
    //1.优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    //2.优化二：当用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    //3.优化三：当用户点击搜索
    const handleSearchClick = () => {
      // console.log('点击了搜索')
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped>
.btn-reset-search {
  text-align: right;
  padding: 0 20px 20px 0;
}
</style>
