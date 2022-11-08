import { ref } from 'vue'
import type pageModal from '@/components/page-model'

type EditFnType = (data?: any) => void

function usePageModal(editCallback?: EditFnType, newCallback?: EditFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  // 新建
  function handleNewClick() {
    modalRef.value?.setDialogVisible()
    if (newCallback) newCallback()
  }
  // 修改
  function handleEditClick(itemData: any) {
    modalRef.value?.setDialogVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }
  return {
    modalRef,
    handleEditClick,
    handleNewClick
  }
}

export default usePageModal
