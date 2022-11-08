import type { IBreadcrumb } from '@/types'
import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1.动态获取所有的路由
  const localRoutes: RouteRecordRaw[] = []
  //   1.1读取router/main下面的所有文件
  // webpakc中式require.context
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  //  1.2将加载的对象存放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单匹配对应的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1.给顶层的菜单添加一个重定向
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (route && !firstMenu) {
        firstMenu = submenu
      }
    }
  }

  return routes
}

/**
 * 根据路径匹配对应的菜单
 * @param path: 需要匹配的路径
 * @param userMenus: 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumb[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 菜单映射Id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: any = []
  function _recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        _recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  _recurseGetId(menuList)
  return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param userMenus 菜单列表
 * @return 权限的数据
 */
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  function _recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (!item.children) {
        if (item.permission) {
          permissions.push(item.permission)
        } else {
          continue
        }
      } else {
        _recurseGetPermission(item.children ?? [])
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}
