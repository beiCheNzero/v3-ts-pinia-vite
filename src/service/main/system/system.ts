import ljlRequest from '@/service'

export function postUserListData(queryInfo: any) {
  return ljlRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
export function deleteUserById(id: number) {
  return ljlRequest.delete({
    url: `/users/${id}`
  })
}
export function createUserData(userInfo: any) {
  return ljlRequest.post({
    url: '/users',
    data: userInfo
  })
}
export function editUserData(id: number, userInfo: any) {
  return ljlRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

export function postPageListData(pageName: string, queryInfo: any) {
  return ljlRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
export function deletePageById(pageName: string, id: number) {
  return ljlRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export function createPageData(pageName: string, pageInfo: any) {
  return ljlRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}
export function editPageData(pageName: string, id: number, userInfo: any) {
  return ljlRequest.patch({
    url: `/${pageName}/${id}`,
    data: userInfo
  })
}
