export interface IBreadcrumb {
  name: string
  path: string
}

export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface ISystemState {
  userList: IUser[]
  userTotalCount: number
  pageList: any[]
  pageTotalCount: number
  currentPage: number
  pageSize: number
}

export interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

export interface IContentProps {
  pageName: string
  header: {
    title: string
    btnTitle: string
  }
  propList: {
    type?: 'selection' | 'index' | 'normal' | 'timer' | 'handler' | 'custom'
    label: string
    width?: string
    prop?: string
    align?: string
    slotName?: string
    options?: any[]
  }[]
  childrenTree?: {
    rowKey: string
    treeProps: {
      children: string
    }
  }
  isPagination: boolean
}
export interface IModalConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

export interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}
