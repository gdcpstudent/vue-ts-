import ljRequest from '..'

enum DashBoardAPI {
  getCategoryGoodsCount = 'goods/category/count',
  getCategoryGoodsSale = 'goods/category/sale',
  getCategoryGoodsFavor = 'goods/category/favor',
  getaddressGoodsSale = 'goods/address/sale'
} //我们有多个网络请求的函数，我们把他们放到一个枚举类型里面方便管理
//
export function getCategoryGoodsCount() {
  return ljRequest.get({
    url: DashBoardAPI.getCategoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return ljRequest.get({
    url: DashBoardAPI.getCategoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return ljRequest.get({
    url: DashBoardAPI.getCategoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return ljRequest.get({
    url: DashBoardAPI.getaddressGoodsSale
  })
}
