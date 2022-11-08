<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="default">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              v-if="!(!isNewRef && item.isPassword)"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  :show-password="item.isPassword"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
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
                  v-model="formData[item.prop]"
                />
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useSystemStore from '@/store/main/system/system'
import type { IUser } from '@/types/data-type'

interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}

// 定义props
const props = defineProps<IModalProps>()

// 1.定义数据
const initalData: any = {}
for (const item of props.modalConfig.formItems) {
  initalData[item.prop] = item.initValue ?? ''
}
const formData = reactive(initalData)
const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref<IUser>()

// 2.新建用户弹窗是否可见
function setDialogVisible(isNew: boolean = true, itemData: any = {}) {
  dialogVisible.value = true
  isNewRef.value = isNew
  // 将编辑的内容回显
  for (const key in formData) {
    if (isNew) {
      formData[key] = ''
    } else {
      formData[key] = itemData[key]
      editData.value = itemData
    }
  }
  // if (!isNew && itemData) {
  //   // 编辑数据
  //   for (const key in formData) {
  //     formData[key] = itemData[key]
  //   }
  //   editData.value = itemData
  // } else {
  //   // 新建数据
  //   for (const key in formData) {
  //     // const item = props.modalConfig.formItems.find((item) => item.prop === key)
  //     formData[key] = ''
  //   }
  // }
}
const systemStore = useSystemStore()

// 点击确定按钮
const handleConfirmClick = () => {
  // 关闭弹窗
  dialogVisible.value = false
  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (isNewRef.value) {
    // 发送新建的请求
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  } else {
    // 发送编辑的请求
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value!.id,
      infoData
    )
  }
}

defineExpose({
  setDialogVisible,
  dialogVisible
})
</script>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
</style>
