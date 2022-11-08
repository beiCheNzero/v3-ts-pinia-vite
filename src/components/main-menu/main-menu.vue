<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="img err" />
      <h3 class="title" v-show="!isFold">北辰后台管理系统</h3>
    </div>
    <div class="menu">
      <el-menu
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :default-active="defaultActive"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <!-- 一级标题 -->
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级标题 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useLoginStore from '@/store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

// 定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 2.监听Item的点击
const router = useRouter()
const handleItemClick = (subitem: any) => {
  const itemURL = subitem.url
  router.push(itemURL)
}

// 3.默认选中的菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background: #001529;
  // background: #053664;
  // background: #001f3c;
}
.logo {
  display: flex;
  height: 30px;
  padding: 10px;
  // 灵活的项目将水平显示，正如一个行一样。
  flex-direction: row;
  // 从行首起始位置开始排列
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px 0 5px;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
    color: white;
    // 段落文本不换行
    white-space: nowrap;
  }
}

// 清除白线
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
