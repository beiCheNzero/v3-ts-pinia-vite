<template>
  <div class="content">
    <div class="header">
      <h3>用户列表</h3>
      <el-button type="primary" @click="handleNewClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" :border="true" style="width: 100%">
        <el-table-column
          align="center"
          type="selection"
          label="选择"
          width="50"
        />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="100"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="100"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150"
        />
        <el-table-column align="center" prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'success' : 'danger'"
              plain
              size="small"
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="EditPen"
              link
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
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
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'

const emit = defineEmits(['newBtnClick', 'editClick'])
const currentPage = ref(1)
const pageSize = ref(10)

// 1.发起actions，请求userList数据
const systemStore = useSystemStore()
fetchUserListData()
watch([currentPage, pageSize], ([newval1, newval2]) => {
  systemStore.currentPage = newval1
  systemStore.pageSize = newval2
})

// 2.获取userList数据
const { userList, userTotalCount } = storeToRefs(systemStore)
// 虽然这里打印没有获取到，但是响应式数据，在获取到值之后会展示界面上。

// 3.页码相关逻辑
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 4.定义函数发送网络请求
function fetchUserListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  systemStore.postUserListAction({ size, offset, ...formData })
}

// 5.编辑和删除操作
const handleEditClick = (itemData: any) => {
  emit('editClick', itemData)
}
const handleDeleteClick = (id: number) => {
  systemStore.deleteUserByIdAction(id)
}

// 6.新建用户
const handleNewClick = () => {
  emit('newBtnClick')
}

// 暴露函数
defineExpose({
  fetchUserListData
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
