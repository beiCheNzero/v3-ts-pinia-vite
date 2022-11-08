<template>
  <div class="department">
    <pageSearch
      :searchConfig="searchConfig"
      @queryClick="handleQueryClick"
      @resetClick="handleResetClick"
    />
    <pageContent
      :contentConfig="contentConfig"
      ref="contentRef"
      @editClick="handleEditClick"
      @newBtnClick="handleNewClick"
    >
      <!--
      <template #parent="scope">{{ scope.row[scope.prop] }}</template>
      -->
    </pageContent>
    <pageModal :modalConfig="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-model'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作(填充options)
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped lang="less"></style>
