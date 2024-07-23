import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  // 表单配置
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名: ',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '详细介绍: ',
      placeholder: '请输入详细介绍'
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
