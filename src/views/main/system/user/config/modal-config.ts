import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  // 表单配置
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名: ',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名: ',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'input',
      label: '密码: ',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '手机号: ',
      placeholder: '请输入手机号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
