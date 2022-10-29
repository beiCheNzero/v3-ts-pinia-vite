import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
import type { IAccount } from '@/types'
import ljlRequest from '..'

export function accountLoginRequest(account: IAccount) {
  return ljlRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return ljlRequest.get({
    url: `/users/${id}`
    // 发送请求的时候可以把token存放在headers中
    // headers: {
    //   authorization: "Bearer " + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenusByRoleID(id: number) {
  return ljlRequest.get({
    url: `/role/${id}/menu`
  })
}
