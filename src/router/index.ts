import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/yui',
      name: 'yui',
      component: () => import('@/views/yui.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // 匹配剩余的所有路径
      name: 'layout',
      component: () => import('@/views/layout.vue'),
    },
  ],
})

export default router
