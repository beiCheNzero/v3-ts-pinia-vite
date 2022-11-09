<template>
  <div class="goods">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @edit-click="handleEditClick"
      @new-btn-click="handleNewClick"
    >
      <template #money="scope">
        <span>￥{{ scope.row[scope.prop] }}</span>
      </template>
      <template #button="scope">
        <el-button :type="scope.row.status ? 'success' : 'danger'">
          {{ scope.row.status ? '在售' : '下架' }}
        </el-button>
      </template>
      <template #imageSlot="scope">
        <el-image
          preview-teleported
          loading="lazy"
          style="width: 40px; height: 60px"
          :src="scope.row[scope.prop]"
          :preview-src-list="[scope.row[scope.prop]]"
          :initial-index="0"
          fit="cover"
        />
      </template>
    </pageContent>
    <pageModal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-model'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped lang="less"></style>
