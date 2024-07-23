import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '80px',
  itemStyle: {
    padding: '10px 20px'
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名: ',
      placeholder: '请输入角色名'
    },
    {
      field: 'id',
      type: 'input',
      label: 'id: ',
      placeholder: '请输入id'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍: ',
      placeholder: '请输入角色介绍'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间: ',
      placeholder: '请输选择创建时间的范围',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
