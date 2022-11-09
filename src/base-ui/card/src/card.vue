<template>
  <div class="ljl-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="item">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string
}
withDefaults(defineProps<IProps>(), {
  title: '标题'
})
</script>

<style scoped lang="less">
.ljl-card {
  margin-bottom: 20px;
}
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
.item {
  margin-bottom: 10px;
}
</style>
