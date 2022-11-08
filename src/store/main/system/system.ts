import {
  deleteUserById,
  postUserListData,
  createUserData,
  editUserData,
  postPageListData,
  deletePageById,
  createPageData,
  editPageData
} from '@/service/main/system/system'
import type { ISystemState, IUser } from '@/types'
import { defineStore } from 'pinia'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0,
    pageSize: 10,
    currentPage: 1
  }),
  getters: {
    size: (state) => {
      return state.pageSize
    },
    offset: (state) => {
      return (state.currentPage - 1) * state.pageSize
    }
  },
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUserListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      // 删除数据之后重新请求新的数据
      this.postUserListAction({
        size: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize
      })
    },
    async newUserDataAction(userInfo: any) {
      const createResult = await createUserData(userInfo)
      this.postUserListAction({
        size: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize
      })
    },
    async editUserDataAction(id: number, userInfo: IUser) {
      const editResult = await editUserData(id, userInfo)
      this.postUserListAction({
        size: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize
      })
    },
    // 重构
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list ?? []
      this.pageTotalCount = totalCount ?? []
    },
    async deletePageDataByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      this.postPageListAction(pageName, {
        size: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize
      })
      // 请求所有的数据(角色,部门,菜单)
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      try {
        const newResult = await createPageData(pageName, pageInfo)
        console.log(newResult)
        this.postPageListAction(pageName, {
          size: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize
        })
        // 请求所有的数据(角色,部门,菜单)
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
      } catch (error) {
        console.log(error)
      }
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: IUser) {
      const editResult = await editPageData(pageName, id, pageInfo)
      this.postPageListAction(pageName, {
        size: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize
      })
      // 请求所有的数据(角色,部门,菜单)
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})
export default useSystemStore
