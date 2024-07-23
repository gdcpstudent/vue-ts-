import ljRequest from '..'
import { IAccount, IDataType, ILoginResult } from './type'
enum LoginAPI {
  LoginUserInfo = '/users/',
  AccountLogin = '/login', //防止url发生改变，因此不给他写死
  UserMenus = '/role/'
}
export function accountLoginRequest(account: IAccount) {
  return ljRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
//
export function requestUserInfoById(id: number) {
  return ljRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusByRoled(id: number) {
  return ljRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
