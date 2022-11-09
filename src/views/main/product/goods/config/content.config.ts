import type { IContentProps } from '@/types'

const contentConfig: IContentProps = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propList: [
    { prop: 'name', label: '商品名称', width: '95' },
    {
      type: 'custom',
      prop: 'oldPrice',
      label: '原价格',
      width: '68',
      slotName: 'money'
    },
    {
      type: 'custom',
      prop: 'newPrice',
      label: '新价格',
      width: '68',
      slotName: 'money'
    },
    // { prop: 'desc', label: '商品描述', width: '90' },
    {
      type: 'custom',
      label: '状态',
      prop: 'enable',
      width: '100',
      slotName: 'button'
    },
    {
      type: 'custom',
      prop: 'imgUrl',
      label: '图片',
      width: '80',
      slotName: 'imageSlot'
    },
    { prop: 'inventoryCount', label: '库存', width: '70' },
    { prop: 'saleCount', label: '销量', width: '70' },
    { prop: 'favorCount', label: '收藏', width: '70' },
    { prop: 'address', label: '地址', width: '70' },
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
    { type: 'handler', label: '操作', width: '140' }
  ]
}

export default contentConfig
