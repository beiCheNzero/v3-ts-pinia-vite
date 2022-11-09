import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'goods',
  header: {
    editTitle: '新建商品',
    newTitle: '新建商品'
  },
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      label: '原价格',
      prop: 'oldPrice',
      placeholder: '请输入商品原价'
    },
    {
      type: 'input',
      label: '折后价',
      prop: 'newPrice',
      placeholder: '请输入商品折后价'
    },
    {
      type: 'input',
      label: '商品描述',
      prop: 'desc',
      placeholder: '请输入商品描述'
    },
    {
      type: 'select',
      label: '商品状态',
      prop: 'enable',
      placeholder: '请选择商品状态',
      options: [
        {
          label: '在售',
          value: 1
        },
        {
          label: '下架',
          value: 0
        }
      ]
    },
    {
      type: 'input',
      label: '商品图片',
      prop: 'imgUrl',
      placeholder: '请输入商品图片url'
    },
    {
      type: 'input',
      label: '商品库存',
      prop: 'inventoryCount',
      placeholder: '请输入商品库存量'
    },
    {
      type: 'input',
      label: '商品销量',
      prop: 'saleCount',
      placeholder: '请输入商品销量'
    }
  ]
}

export default modalConfig
