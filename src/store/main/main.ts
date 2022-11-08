import {
  getEntireDeppartments,
  getEntireMenus,
  getEntireRoles
} from '@/service/main/main'
import type { IMainState } from '@/types'
import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDeppartments()
      const menusResult = await getEntireMenus()
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentResult.data.list
      this.entireMenus = menusResult.data.list
    }
  }
})

export default useMainStore
