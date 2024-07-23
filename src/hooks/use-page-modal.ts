import { ref } from 'vue'
import PageModal from '@/components/page-model'

type CallBackFn = (item?: any) => void //定义函数类型

export function usePageModal(newCb?: CallBackFn, editCb?: CallBackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {} // 重置表单
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb() //当前面有值才调用newCb
  }

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    console.log('点击了编辑按钮', item)
    editCb && editCb(item)
  }
  return {
    pageModalRef,
    defaultInfo,
    handleNewData,
    handleEditData
  }
}
