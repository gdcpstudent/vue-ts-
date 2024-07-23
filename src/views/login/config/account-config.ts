export const rules = {
  name: [
    {
      required: true,
      message: '用户名不能为空~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码必须是6个数字或字母以上~',
      trigger: 'blur'
    }
  ]
}
