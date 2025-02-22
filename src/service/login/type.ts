export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}
export interface IDataType<T = any> {
  code: number
  data: T //这里的data不能写死
}
