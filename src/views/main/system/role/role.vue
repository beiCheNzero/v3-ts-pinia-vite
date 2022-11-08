<template>
  <div class="role">
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
    />
    <pageModal :modalConfig="modalConfig" ref="modalRef" :otherInfo="otherInfo">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          @check="handleElTreeCheck"
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </pageModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
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
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'

// 按钮逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(
  editCallback,
  newCallback
)

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const otherInfo = ref({})
const handleElTreeCheck = (data1: any, data2: any) => {
  let menuList: any = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
</script>

<style scoped></style>
