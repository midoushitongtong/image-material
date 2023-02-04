import type { RouteRecordRaw } from 'vue-router';

// 路由表
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
  },
  {
    path: '/image-material/:id',
    name: 'ImageMaterialDetail',
    meta: {
      transition: 'imater-material-detail',
    },
    component: () => import('@/views/image-material-detail/ImageMaterialDetail.vue'),
  },
];

export default routes;
