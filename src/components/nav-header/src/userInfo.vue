<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          class="avatar"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span>{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><CircleCloseFilled /></el-icon> 退出登录
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><Avatar /></el-icon>用户信息
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><Tools /></el-icon>系统管理
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Avatar, CircleCloseFilled, Tools } from '@element-plus/icons-vue'
import store, { userStore } from '@/store'
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    Avatar,
    CircleCloseFilled,
    Tools
  },
  setup() {
    const store = userStore()
    const name = computed(() => store.state.login.userInfo.name)
    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  .avatar {
    margin-right: 10px;
  }
}
</style>
