<template>
  <div class="char-card">
    <el-card class="box-card" :header="header">
      <slot></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  header?: string
}

const props = withDefaults(defineProps<IProps>(), {
  header: '数据展示'
})
</script>

<style scoped lang="less"></style>
