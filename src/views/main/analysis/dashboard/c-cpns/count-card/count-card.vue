<template>
  <div class="count-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subTitle }}</span>
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1: number
  number2: number
  subTitle?: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有商品总销量',
  numer1: 9999,
  numer2: 9999,
  subTitle: '商品总量'
})

const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
const addPrefix = {
  prefix: props.amount === 'saleroom' ? '￥' : ''
}
onMounted(() => {
  const countUp1 = new CountUp(count1Ref.value!, props.number1, addPrefix)
  const countUp2 = new CountUp(count2Ref.value!, props.number2, addPrefix)
  countUp1.start()
  countUp2.start()
})
</script>

<style scoped lang="less">
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: #fff;
  box-shadow: 0 0 10px rgba(1, 1, 1, 0.1);

  .header {
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    align-items: center;
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
