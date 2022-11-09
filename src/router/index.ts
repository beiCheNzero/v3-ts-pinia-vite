import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/Not-found.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to, from) => {
  // 获取token
  const token = localCache.getCache(LOGIN_TOKEN)
  // 路劲是以/main开头
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 如果是进入到main中/token有值
  if (to.path === '/main') return `${firstMenu.url}`
})

export default router
