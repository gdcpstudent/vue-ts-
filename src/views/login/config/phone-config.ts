export const rules = {
  num: [
    {
      required: true,
      message: '手机号不能为空~',
      trigger: 'blur'
    }
  ],
  verify: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    }
  ]
}
