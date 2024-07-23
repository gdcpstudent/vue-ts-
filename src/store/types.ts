import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'
import { IDashboardState } from './main/analysis/types'
export interface IRootState {
  name: string
  password: string
  entireDepartment: any[] // 所有部门
  entireRole: any[] // 所有角色,
  entireMenu: any[] // 所有菜单
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
