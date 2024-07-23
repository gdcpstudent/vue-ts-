<template>
  <div class="pagemodal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <lj-form v-bind="modalConfig" v-model="formData"></lj-form>
      <slot></slot>
      <!-- 添加默认插槽 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfigClick">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import LjForm from '@/base-ui/form'

import { useStore } from 'vuex'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    // 默认数据
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      //为了让我们的pageModal能接收额外的数据，我们定义了这个
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    LjForm
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    //点击确定按钮的逻辑
    const store = useStore()
    const handleConfigClick = () => {
      dialogVisible.value = false

      if (Object.keys(props.defaultInfo).length) {
        //如果是编辑，则defaultInfo是有数据的
        //编辑
        console.log('编辑数据')
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo }, //edit里面的数据可以从我们的formData中获取
          id: props.defaultInfo.id
        })
      } else {
        //新建
        console.log(formData.value)
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfigClick
    }
  }
})
</script>

<style scoped></style>
