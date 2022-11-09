import type { IContentProps } from '@/types'

const contentConfig: IContentProps = {
  pageName: 'category',
  header: {
    title: '分类列表',
    btnTitle: '新建分类'
  },
  propList: [
    { prop: 'name', label: '商品类别', width: '150' },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间'
    },
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间'
    },
    { type: 'handler', label: '操作', width: '200' }
  ],
  isPagination: true
}

export default contentConfig
