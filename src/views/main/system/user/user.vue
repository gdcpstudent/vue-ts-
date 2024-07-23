<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalConfig="modalConfigRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import PageSearch from '@/base-ui/page-search'
import pageContent from '@/base-ui/page-content'
import PageModal from '@/components/page-model'

import { searchFormConfig } from './config/search-conifg'
import { contentTableConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'

import { usePageModal } from '@/hooks/use-page-modal'
import { usePageSearch } from '@/hooks/use-page-search'
import { userStore } from '@/store'

export default defineComponent({
  name: 'users',
  components: { PageSearch, pageContent, PageModal },
  setup() {
    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑 当用户点击新建用户按钮是，密码框显示，点击编辑是，密码框不显示
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }

    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    // 2. 动态添加部门和角色列表
    const store = userStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    //3.调用pageModal相关的hook逻辑
    const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal(newCallback, editCallback)

    return {
      pageContentRef,
      searchFormConfig,
      // ...usePageSearch,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      // modalConfig,把普通的这个换成响应式的modalConfigRef
      modalConfigRef,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
