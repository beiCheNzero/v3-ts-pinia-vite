<template>
  <div class="overview">
    <ljlCard title="关于">
      <div class="c-left">
        <span>
          Vue3Admin 是基于 Vue3、Pinia、VueRouter、Vite、 ElementPlus
          、TypeScript、Echart5 等后台系统解决方案。
        </span>
      </div>
    </ljlCard>
    <ljlCard title="技术栈">
      <ljlTextLink :text-arrs="technologyStacks" />
      <ljlDesc title="生产环境依赖" :column="2" :table-datas="dependencies" />
      <ljlDesc
        title="开发环境依赖"
        :column="2"
        :table-datas="devDependencies"
      />
    </ljlCard>
    <ljlCard title="项目规范">
      <ljlDesc
        title="文件命名规范"
        :column="1"
        :table-datas="[
          { name: '文件夹', description: '统一小写, 多个单词使用-分割' },
          {
            name: '文件(.ts .vue .json .d.ts)',
            description: '统一小写, 多个单词使用-分割'
          }
        ]"
      />
      <ljlDesc title="编写组件规范" :column="1" :table-datas="componentRules" />
    </ljlCard>
    <ljlCard title="Git提交规范">
      <ljlDesc
        :column="1"
        :table-datas="[
          { name: 'add 操作', description: 'git add . ' },
          {
            name: 'commit 操作',
            description: 'npm commit / npx cz '
          },
          { name: 'pull 操作', description: 'git pull ' },
          { name: 'push 操作', description: 'git push ' }
        ]"
      />
    </ljlCard>
  </div>
</template>

<script setup lang="ts">
import ljlCard from '@/base-ui/card'
import ljlTextLink from '@/base-ui/text-link'
import ljlDesc from '@/base-ui/desc'

import {
  technologyStacks,
  dependencies,
  devDependencies,
  componentRules
} from './config'
</script>

<style scoped lang="less">
.overview {
  .c-left {
    text-align: left;
  }

  .el-card {
    margin-bottom: 20px;
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-card__header span) {
      // ::v-deep .el-card__header span {
      font-weight: 700;
    }
  }
}
</style>
