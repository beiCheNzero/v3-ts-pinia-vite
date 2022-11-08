<template>
  <div class="search">
    <el-form :model="searchFrom" ref="formRef" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchFrom.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchFrom.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchFrom.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchFrom.enable"
              placeholder="请选择状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchFrom.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button icon="refresh" type="primary" @click="handleResetClick">
        重置
      </el-button>
      <el-button icon="search" type="success" @click="handleQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

const searchFrom = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

// 重置
const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  // 需要和el-form-item中的prop一起使用，就和rules校验规则一样，需要传入prop
  formRef.value?.resetFields()
  emit('resetClick')
}
const handleQueryClick = () => {
  console.log('查询数据', searchFrom)
  emit('queryClick', searchFrom)
}
</script>

<style scoped lang="less">
.search {
  background: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 20px 10px 0;

  .el-button {
    height: 36px;
  }
}
</style>
