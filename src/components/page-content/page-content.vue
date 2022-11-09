<template>
  <div class="content">
    <div class="header">
      <h3>{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewClick">
        {{ contentConfig.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        :border="true"
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column :align="item.align ?? 'center'" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column
              :align="item.align ?? 'center'"
              v-bind="item"
              v-if="!(!isEdit && !isDelete)"
            >
              <template #default="scope">
                <el-button
                  v-if="isEdit"
                  type="primary"
                  size="small"
                  icon="EditPen"
                  link
                  @click="handleEditClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  type="danger"
                  size="small"
                  icon="Delete"
                  link
                  @click="handleDeleteClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column :align="item.align ?? 'center'" v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              show-overflow-tooltip
              :align="item.align ?? 'center'"
              v-bind="item"
            ></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination" v-if="props.contentConfig.isPagination ?? true">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import usePermission from '@/hooks/usePermission'

export interface IContentProps {
  contentConfig: {
    pageName: string
    header: {
      title: string
      btnTitle: string
    }
    propList: any[]
    childrenTree?: {
      rowKey: string
      treeProps: {
        children: string
      }
    }
    isPagination?: boolean
  }
}
const props = defineProps<IContentProps>()

const emit = defineEmits(['newBtnClick', 'editClick'])

// 获取用户是否拥有按钮权限
const isCreate = usePermission(`${props.contentConfig.pageName}:create`)
const isEdit = usePermission(`${props.contentConfig.pageName}:update`)
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`)
const isQuery = usePermission(`${props.contentConfig.pageName}:query`)

// 1.发起actions，请求userList数据
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()

// 监听systemAction被执行,并将当前页重置为1
systemStore.$onAction(({ name, after }) => {
  // after会确保action执行完成之后才会调用的函数
  after(() => {
    if (name === 'deletePageDataByIdAction' || name === 'newPageDataAction') {
      currentPage.value = 1
    }
  })
})
// 发送数据请求
fetchPageListData()
// 监听数据条数和当前页的改变，并存到systemstore的state中
watch([currentPage, pageSize], ([newval1, newval2]) => {
  systemStore.currentPage = newval1
  systemStore.pageSize = newval2
})

// 2.获取userList数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// 虽然这里打印没有获取到，但是响应式数据，在获取到值之后会展示界面上。

// 3.页码相关逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数发送网络请求
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  systemStore.postPageListAction(props.contentConfig.pageName, {
    size,
    offset,
    ...formData
  })
}

// 5.编辑和删除操作
const handleEditClick = (itemData: any) => {
  emit('editClick', itemData)
}
const handleDeleteClick = (id: number) => {
  systemStore.deletePageDataByIdAction(props.contentConfig.pageName, id)
}

// 6.新建用户
const handleNewClick = () => {
  emit('newBtnClick')
}

// 暴露函数
defineExpose({
  fetchPageListData
})
</script>

<style scoped lang="less">
.content {
  background: rgb(255, 255, 255);
  margin-top: 20px;
  padding: 15px;

  .header {
    display: flex;
    justify-content: space-between; // 左右居中
    align-items: center;
    margin-bottom: 15px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
