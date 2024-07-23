<template>
  <div class="nav-header">
    <el-icon class="expand-icon" @click="handleFoldClick"><Expand /></el-icon>
    <div class="header-content">
      <lj-breadcromb :breadcrumb="breadcrombs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Expand } from '@element-plus/icons-vue'
import UserInfo from './userInfo.vue'
import LjBreadcromb, { IBreadcrumb } from '@/base-ui/breadcromb'

import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { userStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    Expand,
    UserInfo,
    LjBreadcromb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //面包屑数据 {{name ,path: }}
    const store = userStore()
    const route = useRoute()
    const breadcrombs = computed(() => {
      const userMenues = store.state.login.userMenus
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenues, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrombs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  display: flex;
  align-items: center;
  .expand-icon {
    font-size: 25px;
    cursor: pointer;
  }
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center; //垂直居中
    flex: 1;
    padding: 0 20px;
  }
}
</style>
