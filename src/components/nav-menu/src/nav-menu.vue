<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="" />
      <span v-if="!collapse" class="title">CZL+Vue3+Ts</span>
    </div>
    <el-menu
      :default-active="defaultMenuValue"
      class="el-medu-vertial"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      :unique-opened="false"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenues" :key="item.id">
        <!-- 一级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <template></template>
              <el-icon><Monitor /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 一级菜单下拉 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuIconClick(subitem)"
              >
                <i v-if="subitem.icon" style="color: white"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 二级菜单 -->
        <template v-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { userStore } from '@/store'
import { Monitor } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  components: {
    Monitor
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    //store里面相关的东西
    const store = userStore()
    const userMenues = computed(() => store.state.login.userMenus)
    // console.log('userMenus的值', userMenues)

    //router里面相关的东西
    const router = useRouter()
    const route = useRoute() //useRoute可以拿到当前的路由
    const currentPath = route.path
    //根据路径与菜单进行匹配

    //data
    const menu = pathMapToMenu(userMenues.value, currentPath) //这里取userMenus.value,因为computed(() => store.state.login.userMenus)是一个ref对象，要求要.value
    const defaultMenuValue = ref(menu + '') //ref要求传String类型，我们加上一个 '' 变成字符串
    // console.log('menu的值', menu)

    //even事件处理
    const handleMenuIconClick = (item: any) => {
      console.log(item)
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      userMenues,
      handleMenuIconClick,
      defaultMenuValue
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
