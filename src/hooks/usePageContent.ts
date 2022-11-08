import { ref } from 'vue'
import type pageContent from '@/components/page-content'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  // 查询
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  // 清空
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
