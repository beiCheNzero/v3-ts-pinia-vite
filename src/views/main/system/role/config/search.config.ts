import type { ISearchProps } from "@/types"

const searchConfig: ISearchProps = {
  pageName: 'role',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询的角色名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'intro',
      label: '角色介绍',
      placeholder: '请输入查询的角色介绍'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}
export default searchConfig
