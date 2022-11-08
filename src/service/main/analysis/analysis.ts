import ljlRequest from '@/service'

export function getAmountListData() {
  return ljlRequest.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return ljlRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return ljlRequest.get({
    url: '/goods/category/sale'
  })
}
export function getGoodsCategoryFavor() {
  return ljlRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return ljlRequest.get({
    url: '/goods/address/sale'
  })
}
