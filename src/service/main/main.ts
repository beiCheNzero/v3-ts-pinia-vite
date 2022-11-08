import ljlRequest from '..'

export function getEntireRoles() {
  return ljlRequest.post({
    url: '/role/list'
  })
}

export function getEntireDeppartments() {
  return ljlRequest.post({
    url: '/department/list'
  })
}

export function getEntireMenus() {
  return ljlRequest.post({
    url: '/menu/list'
  })
}
