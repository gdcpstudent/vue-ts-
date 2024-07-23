<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account">
      <el-form-item label="账号：" prop="name" class="label-item">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account-config'
import LocalCache from '../utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      //如果是空的话则赋值为空
      password: LocalCache.getCache('password') ?? ''
    })
    const LoginAction = (isKeepPassword: boolean) => {
      if (isKeepPassword) {
        LocalCache.setCache('name', account.name)
        LocalCache.setCache('password', account.password)
        // console.log('account登录')
      } else {
        LocalCache.deleteCache('name')
        LocalCache.deleteCache('password')
      }
      //开始进行登录验证
      store.dispatch('login/accountLoginAction', { ...account })
    }

    return {
      account,
      rules,
      LoginAction
    }
  }
})
</script>

<style scoped lang="less"></style>
