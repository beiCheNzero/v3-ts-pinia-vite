<template>
  <div class="rose-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import BaseEchart from '..'

interface IEchartValueType {
  value: number
  name: string
}

interface IProps {
  roseData: IEchartValueType[]
}
const props = defineProps<IProps>()

const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: [10, 80],
        center: ['50%', '50%'],
        bottom: '-15%',
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: true
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
