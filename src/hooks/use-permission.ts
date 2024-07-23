import { userStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = userStore()
  const permissions = store.state.login.permissions
  // 返回一个函数，函数内部判断是否有权限
  const verifyPermission = `system${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermission)
  // 上面用法等同于下面
  // return Boolean(permissions.find((item) => item === verifyPermission))
}
