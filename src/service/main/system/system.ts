import LjForm from '@/base-ui/form'
import ljRequest from '@/service'
import { IDataType } from '@/service/login/type'

export function getPageListData(url: string, queryInfo: any) {
  return ljRequest.post({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return ljRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return ljRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return ljRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
