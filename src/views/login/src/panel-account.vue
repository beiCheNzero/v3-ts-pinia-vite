<template>
  <div class="panel-account">
    <el-form
      label-width="60px"
      :model="account"
      :rules="FormRule"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" required prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" required prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import FormRule from '../config/rules'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_USERINFO = 'userInfo'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_USERINFO)?.name ?? '',
  password: localCache.getCache(CACHE_USERINFO)?.password ?? ''
})

// 执行账号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isKeepPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取账户密码
      const { name, password } = account

      // 2.发送网络请求
      loginStore.loginAccountActions({ name, password }).then((res) => {
        // 3.登录成功之后记住密码
        if (isKeepPwd) {
          localCache.setCache(CACHE_USERINFO, { name, password })
        } else {
          localCache.removeCache(CACHE_USERINFO)
        }
      })
    } else {
      ElMessage.error('账号或密码验证失败~')
    }
  })
}

// 将子组件暴露出去
defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
