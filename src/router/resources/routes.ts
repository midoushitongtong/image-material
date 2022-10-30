import type { RouteRecordRaw } from 'vue-router';

// 路由表
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
  },
];

export default routes;
