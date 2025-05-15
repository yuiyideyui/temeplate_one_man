import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout.vue'),
    },
    {
      path: '/yui',
      name: 'yui',
      component: () => import('@/views/yui.vue'),
    },
  ],
})

export default router
