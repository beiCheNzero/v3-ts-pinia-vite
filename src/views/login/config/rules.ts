import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

const FormRule: FormRules = reactive({
  name: [
    {
      required: true,
      message: '用户名不能为空~',
      trigger: 'blur' // change
    },
    {
      type: 'string',
      pattern: /^\w{2,}$/,
      message: '用户名必须是2位以上的~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空~',
      trigger: 'blur'
    },
    {
      type: 'string',
      pattern: /^\w{5,10}$/,
      message: '密码应为5-10位的~',
      trigger: 'blur'
    }
  ]
})

export default FormRule
