import type { IContentProps } from '@/types'
const contentConfig: IContentProps = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propList: [
    { prop: 'name', label: '菜单名称', width: '150px' },
    { prop: 'type', label: '级别', width: '80px' },
    { prop: 'url', label: '菜单url', width: '130px' },
    { prop: 'icon', label: '菜单图标', width: '150px' },
    { prop: 'permission', label: '权限', width: '100px' },
    { prop: 'sort', label: '排序', width: '100px' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handler', label: '操作', width: '150px' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },
  isPagination: false
}

export default contentConfig
