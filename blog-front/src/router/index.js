import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/home/index.vue')
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    name: 'BlogAdmin',
    path: '/blog_admin',
    component: () => import('@/views/blog-admin/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
