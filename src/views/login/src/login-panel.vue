<template>
  <div class="login-panel">
    <h1 class="title">北辰后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch lazy v-model="activeTabs">
        <el-tab-pane label="帐号登录" name="account">
          <!-- 默认提供的label插槽 -->
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <panel-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginAction">
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'

const isKeepPwd = ref<boolean>(localCache.getCache('isKeepPwd') ?? false)
watch(
  isKeepPwd,
  (newValue) => {
    localCache.setCache('isKeepPwd', newValue)
  },
  { immediate: true }
)

const activeTabs = ref<string>('account')
/*
 * 可以将PanelAccount看成一个构造器，通过它可以创建出来多个对应的实例对象。
 * typeof 是为了获取到PanelAccount的类型：DefineComponent
 * typeof PanelAccount的结果是一个构造器，
 * InstanceType是需要传入一个构造器的。
 */
const accountRef = ref<InstanceType<typeof PanelAccount>>()

/*
 * 这里实现的方法有很多
 * 这里采用的是：通过ref获取到PanelAccount的实例对象调用它里面的函数
 * 也可以把子组件的数据传给父组件，然后在父组件中做对应的逻辑，不过比较麻烦，且逻辑和代码要复杂一点。
 * 每个组件有对应自己要完成的事情，做好自己的事情就可以。
 */
const handleLoginAction = () => {
  if (activeTabs.value === 'account') {
    // 账号登录
    accountRef.value?.loginAction(isKeepPwd.value)
  } else {
    // 密码登录
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 120px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .controls {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --large-button-size: 20px !important;
  }
}
</style>
