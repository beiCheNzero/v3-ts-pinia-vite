<template>
  <div class="main-header">
    <div class="menu-icon">
      <el-icon size="28px" @click="handleIconChange">
        <component :is="isFlod ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <HeaderCrumb />
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'

// 自定义事件
const emit = defineEmits(['isFoldChange'])

const isFlod = ref<boolean>(false)
const handleIconChange = () => {
  // 1.内部改变数据
  isFlod.value = !isFlod.value

  // 2.将事件和状态传递给父组件
  emit('isFoldChange', isFlod.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
