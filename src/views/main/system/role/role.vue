<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      pageName="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          style="max-width: 600px"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { ElTree } from 'element-plus'
import pageContent from '@/base-ui/page-content/src/page-content.vue'
import PageSearch from '@/base-ui/page-search/src/page-search.vue'
import PageModal from '@/components/page-model/src/PageModal.vue'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search-conifg'
import { modalConfig } from './config/modal-config'
import { mapMenusToLeafKeys } from '@/utils/map-menus'
import { usePageModal } from '@/hooks/use-page-modal'

import { userStore } from '@/store'

export default defineComponent({
  name: 'role',
  components: { pageContent, PageSearch, PageModal },
  setup() {
    // 1.处理page-modal逻辑
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      // console.log({ ...item.menuList })
      const leafKeys = mapMenusToLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    // 处理page-modal逻辑
    const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal(undefined, editCallback)

    const store = userStore()
    const menus = computed(() => store.state.entireMenu) //使用计算属性，以防菜单数据变化时，页面不更新

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      // console.log('data1', data1)
      // console.log('data2', data2)

      const checkedKeys = data2.checkedKeys //这个数组包含了当前所有被完全选中的树节点的
      const halfCheckedKeys = data2.halfCheckedKeys //这个数组包含了当前处于半选中状态的树节点的
      const menuList = [...checkedKeys, ...halfCheckedKeys]

      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
