<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside
        :width="isCollapse ? '60px' : '210px'"
        class="main-container-aside"
      >
        <MainMenu :isFold="isCollapse" />
      </el-aside>
      <el-container class="main-container-2">
        <el-header height="50px" class="container-header">
          <MainHeader @isFoldChange="handleFoldChange" />
        </el-header>
        <el-main class="container-main">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/components/main-menu'
import MainHeader from '@/components/main-header'

// 处理main-header中fold的变化
const isCollapse = ref(false)
const handleFoldChange = (Fold: boolean) => {
  isCollapse.value = Fold
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}

.main-container {
  height: 100%;

  .main-container-aside {
    background-color: #001529;
    // 内容会被截断，且不会显示滚动条。
    overflow-x: hidden;
    // 浏览器决定
    overflow-y: auto;
    line-height: 200px;
    text-align: center;
    // 悬浮于连接上时，通常为手
    cursor: pointer;
    transition: width 0.3s ease-in-out;
    // 实验性功能：属性允许开发者设置滚动条出现时的厚度
    scrollbar-width: none; // 兼容firefox
    -ms-overflow-style: none; // IE 10+

    // 删除滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    // .main-container-2 {
    //   background: rgb(241, 241, 241);
    // }
  }

  .container-main {
    width: 100%;
    background: #f3f3f3;
  }

  // .container-main .main-container-2 {
  //   width: 100%;
  //   background: #f9fcff;
  // }
}
</style>
