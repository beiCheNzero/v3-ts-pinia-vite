<template>
  <div class="ljl-desc">
    <el-descriptions
      :title="title"
      direction="vertical"
      :column="column"
      size="small"
      border
    >
      <template v-for="(item, index) in tableDatas" :key="index">
        <el-descriptions-item>
          <template #label>
            {{ item.name }} :
            <el-tag size="small">{{ item.description }}</el-tag>
          </template>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title?: string
  column: number
  tableDatas: any[]
}
defineProps<IProps>()
</script>

<style scoped lang="less">
.ljl-desc {
  margin-bottom: 20px;
}
</style>
