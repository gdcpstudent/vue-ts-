<template>
  <div class="login-phone">
    <el-form :rules="rules" :model="phone">
      <el-form-item label="手机号：" prop="num" class="label-item">
        <el-input v-model="phone.num" />
      </el-form-item>
      <div class="verify-code">
        <el-form-item label="验证码：" prop="verify">
          <el-input v-model="phone.verify" />
        </el-form-item>
        <el-button type="primary" class="get-verify">获取验证码</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      verify: ''
    })
    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.verify-code {
  display: flex;
  justify-content: space-between;
}
.get-verify {
  margin-left: 10px;
}
</style>
