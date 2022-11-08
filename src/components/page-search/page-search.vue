<template>
  <div class="page-search" v-if="isQuery">
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option
                      :label="option.label"
                      :value="option.value"
                    ></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="searchForm[item.prop]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import usePermission from '@/hooks/usePermission'

export interface ISearchProps {
  searchConfig: {
    pageName: string
    formItems: any[]
    labelWidth?: string
  }
}

// 定义自定义事件/接收数据
const emit = defineEmits(['queryClick', 'resetClick'])
/*
 * 传给defineProps的泛型接口不能是从外部导入的接口类型。官方文档中提到了
 */
const props = defineProps<ISearchProps>()
// 可以定义props接收参数的默认值
// const props = withDefaults(defineProps<ISearchProps>(), {})

// 按钮权限
const isQuery = usePermission(`${props.searchConfig.pageName}:query`)

const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initValue ?? ''
}
const searchForm = reactive(initialForm)

// 重置
const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  // 需要和el-form-item中的prop一起使用，就和rules校验规则一样，需要传入prop
  formRef.value?.resetFields()
  emit('resetClick')
}
const handleQueryClick = () => {
  emit('queryClick', searchForm)
}
</script>

<style scoped lang="less">
.page-search {
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
