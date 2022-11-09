const searchConfig = {
  pageName: 'category',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '类别名称',
      placeholder: '请输入类别名称'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
