import type { IModalConfig } from '@/types'
const modalConfig: IModalConfig = {
  pageName: 'users',
  header: {
    newTitle: '新建用户',
    editTitle: '编辑用户'
  },
  formItems: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
      placeholder: '请输入用户名',
      initValue: ''
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'input',
      label: '用户密码',
      prop: 'password',
      placeholder: '请输入用户密码',
      isPassword: 'show-password'
    },
    {
      type: 'input',
      label: '手机号码',
      prop: 'cellphone',
      placeholder: '请输入手机号码'
    },
    {
      type: 'select',
      label: '角色',
      prop: 'roleId',
      placeholder: '请选择角色名称',
      options: []
    },
    {
      type: 'select',
      label: '部门',
      prop: 'departmentId',
      placeholder: '请选择部门名称',
      options: []
    }
  ]
}

export default modalConfig
