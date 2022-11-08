<template>
  <div class="base-echarts">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

interface IProps {
  options: EChartsOption
}
const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  // 1.初始化
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  // 2.第一次进行set
  /*
   * watchEffect会自动收集依赖，当依赖发生变化的时候，自动回调函数
   */
  watchEffect(() => echartInstance.setOption(props.options))

  window.addEventListener('reset', () => {
    echartInstance.resize()
  })
})
</script>

<style scoped lang="less">
.echart {
  height: 250px;
}
</style>
