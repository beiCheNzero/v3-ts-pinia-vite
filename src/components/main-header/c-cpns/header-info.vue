<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-badge is-dot>
          <el-icon size="20px"><BellFilled /></el-icon>
        </el-badge>
      </span>
      <span>
        <el-icon size="20px"><Location /></el-icon>
      </span>
      <span class="new-msg">
        <el-badge value="5">
          <el-icon size="20px"><Message /></el-icon>
        </el-badge>
      </span>
    </div>
    <div class="info">
      <el-dropdown :hide-on-click="false" :show-timeout="100">
        <span class="user-info">
          <el-avatar
            :size="30"
            fit="fill"
            src="https://haixia-1303842518.cos.ap-guangzhou.myqcloud.com/%E6%B5%B7%E9%9C%9E%2Fhead-photo%2F%E6%9D%8E%E4%BD%B3%E4%B9%90.jpg"
          ></el-avatar>
          <span class="name">beichen</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="CircleClose" @click="handleExitClick">
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided icon="UserFilled">
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item icon="Compass">
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleExitClick = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}
.operation {
  display: inline-flex;
  margin-right: 10px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      cursor: pointer;
      border-radius: 10px;
      background: #f2f2f2;
    }
  }
}
.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .name {
    margin-left: 10px;
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 30px;
    padding: 6px 22px;
  }
}
</style>
