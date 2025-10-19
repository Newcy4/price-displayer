/*
 * @Date: 2025-10-08 16:48:01
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-19 22:53:03
 * @FilePath: /price-displayer/src/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Price',
      component: () => import('@/views/Price.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
    },
    {
      path: '/mediaDashboard',
      name: 'MediaDashboard',
      component: () => import('@/views/MediaDashboard.vue'),
    },
  ],
})

export default router
