<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机号登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="acccount-control">
      <el-checkbox label="记住密码" v-model="isKeepPassword"></el-checkbox>
      <el-link class="forget-pwd">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="loginHandleClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { User } from '@element-plus/icons-vue'
import { Iphone } from '@element-plus/icons-vue'

import loginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: { loginAccount, LoginPhone, User, Iphone },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const currentTab = ref('account')

    const loginHandleClick = () => {
      if (currentTab.value == 'account') {
        accountRef.value?.LoginAction(isKeepPassword.value)
        // console.log('账号登录')
      } else {
        // console.log('phone登录')
      }
    }
    return {
      isKeepPassword,
      loginHandleClick,
      accountRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.title {
  text-align: center;
}
.login-panel {
  width: 320px;
  margin-top: 150px;
}
.acccount-control {
  display: flex;
  justify-content: space-between;
}
.forget-pwd {
  margin-top: -4px;
  text-decoration: none;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
