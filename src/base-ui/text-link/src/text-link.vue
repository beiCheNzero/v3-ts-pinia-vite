<template>
  <div class="ljl-text-link">
    <template v-for="(item, index) in textArrs" :key="index">
      <div class="item">
        <span class="title">{{ item.title }} : </span>
        <el-link type="primary">{{ item.desp }}</el-link>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  textArrs: any[]
}

withDefaults(defineProps<IProps>(), {
  textArrs: () => []
})
</script>

<style scoped lang="less">
.ljl-text-link {
  margin-bottom: 15px;
}
</style>
