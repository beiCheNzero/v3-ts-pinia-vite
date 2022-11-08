const searchConfig = {
  pageName: 'users',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
      placeholder: '请输入查询的用户名',
      initValue: ''
    },
    {
      type: 'input',
      prop: 'realname',
      label: '真实姓名',
      placeholder: '请输入查询的真实姓名'
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '手机号码',
      placeholder: '请输入查询的手机号码'
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请输入查询的用户状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
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
