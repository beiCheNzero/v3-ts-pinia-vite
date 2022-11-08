import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleID
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constant'
import type { ILoginState } from '@/types/login_state_types'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import type { RouteRecordRaw } from 'vue-router'
import useMainStore from '../main/main'

/*
 * 第一个传入的泛型是'login'的类型
 * 第二个是state的类型
 * 第三个是getters的类型
 * 第四个是actions的类型
 */
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? [],
    permissions: []
  }),
  actions: {
    async loginAccountActions(account: IAccount) {
      // 1.账号登录，将用户信息保存到state中
      const loginData = await accountLoginRequest(account)
      const id = loginData.data.id
      this.token = loginData.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取用户的详细信息
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      // 3.根据角色获取菜单
      const userMenusRes = await getUserMenusByRoleID(this.userInfo.role.id)
      const userMenus = userMenusRes.data
      this.userMenus = userMenus

      // 4.进行本地缓存操作
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenus', this.userMenus)

      // 请求所有的数据(角色，部门)
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 获取登录用户所有的按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      /*
       * 5.动态添加路由
       */
      const routes: RouteRecordRaw[] = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 6.进行页面跳转(main界面)
      router.push('/main')
    },
    loadLocalCacheActions() {
      // 1.用户进行刷新时默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 请求所有的数据(角色，部门)
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  },
  // 持久化存储
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['permissions'],
        key: 'permissions'
      }
      // {
      //   storage: localStorage, //localStorage存储多个key
      //   paths: ['token']
      //   // key: 'token'
      // },
      // {
      //   storage: localStorage,
      //   paths: ['userInfo']
      //   // key: 'userInfo'
      // },
      // {
      //   storage: localStorage,
      //   paths: ['userMenus']
      //   // key: 'userMenus'
      // }
    ]
  }
})

export default useLoginStore
