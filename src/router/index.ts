import { createRouter, createWebHistory } from 'vue-router'
import { BProgress } from '@bprogress/core'
const staticRouter = [
    {
        path: '/yui',
        name: 'yui',
        component: () => import('@/views/yui.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/:pathMatch(.*)*', // 匹配剩余的所有路径
        name: 'layout',
        component: () => import('@/views/layout.vue')
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: staticRouter
})
router.beforeEach((to, from, next) => {
    BProgress.start()
    next()
})
router.afterEach((to, from) => {
    BProgress.done()
})
export default router
