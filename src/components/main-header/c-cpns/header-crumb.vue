<template>
  <div class="crumb">
    <el-breadcrumb separator=">">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'

const route = useRoute()
const userMenus = useLoginStore().userMenus
// 根据路径变化改变面包屑数据。
// 方式一：
// const breadcrumbs = ref(mapPathToBreadcrumbs(route.path, userMenus))
// watch(
//   () => route.path,
//   (newval) => {
//     breadcrumbs.value = mapPathToBreadcrumbs(newval, userMenus)
//   }
// )
// 方式二：
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style scoped lang="less">
.crumb {
  color: red;
}
</style>
