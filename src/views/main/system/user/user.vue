<template>
  <div class="user">
    <pageSearch
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      :contentConfig="contentConfig"
      ref="contentRef"
      @new-btn-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #button="scope">
        <el-button :type="scope.prop ? 'success' : 'danger'">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template></pageContent
    >
    <pageModal :modalConfig="modalConfigRef" ref="modalRef"> </pageModal>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-model'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'

const { handleQueryClick, handleResetClick, contentRef } = usePageContent()
const { handleEditClick, handleNewClick, modalRef } = usePageModal()

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const { entireRoles, entireDepartments } = storeToRefs(mainStore)
  // 清空角色数组中原有的值/存放最新的值
  modalConfig.formItems.find((item) => {
    if (item.prop === 'roleId' || item.prop === 'departmentId') {
      if (item.options) item.options = []
    }
  })

  const roles = entireRoles.value.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'roleId') {
      item.options?.push(...roles)
    }
  })
  const departments = entireDepartments.value.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'departmentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})
</script>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
