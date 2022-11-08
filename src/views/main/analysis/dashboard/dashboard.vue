<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <CountCard v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <!-- 中间部分 -->
    <el-row :gutter="10">
      <el-col :span="8">
        <ChartCard> <PieEchart :pie-data="showGoodsCategoryCount" /></ChartCard>
      </el-col>
      <el-col :span="10">
        <ChartCard> <MapEchart :map-data="showAddressSale" /></ChartCard>
      </el-col>
      <el-col :span="6">
        <ChartCard>
          <RoseEchart :rose-data="showGoodsCategoryCount" />
        </ChartCard>
      </el-col>
    </el-row>
    <!-- 底部 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <ChartCard>
          <!--
            :labels="showGoodsCategorySale.labels"
            :values="showGoodsCategorySale.values"
          -->
          <LineEchart v-bind="showGoodsCategorySale" />
        </ChartCard>
      </el-col>
      <el-col :span="12">
        <ChartCard> <BarEchart v-bind="showGoodsCategoryFavor" /> </ChartCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useAnalysisStore from '@/store/main/analysis/analysis'
import CountCard from './c-cpns/count-card/count-card.vue'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
import {
  PieEchart,
  LineEchart,
  RoseEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

// 1.发起数据请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store中获取数据
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale
} = storeToRefs(analysisStore)

// 3.获取echarts中的数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    value: item.goodsCount,
    name: item.name
  }))
})
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style scoped lang="less">
.dashboard {
}

.el-row {
  margin-bottom: 10px;
}
</style>
