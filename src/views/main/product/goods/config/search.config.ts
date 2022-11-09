import type { ISearchProps } from '@/types'

const searchConfig: ISearchProps = {
  pageName: 'goods',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      prop: 'address',
      label: '商品地址',
      placeholder: '请输入商品地址'
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '可用', value: 1 },
        { label: '下架', value: 0 }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
