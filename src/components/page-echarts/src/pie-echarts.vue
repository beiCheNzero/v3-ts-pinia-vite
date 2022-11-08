<template>
  <div class="pie-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseEchart from '..'

interface IEchartValueType {
  value: number
  name: string
}

interface IProps {
  pieData: IEchartValueType[]
}
const props = defineProps<IProps>()
/*
 * 计算属性依赖props.pieData，当props.pieData发生变化时会返回一个新的options
 */
const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        bottom: '-20%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
