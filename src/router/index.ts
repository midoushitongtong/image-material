import { createRouter, createWebHistory } from 'vue-router';
import routes from './resources/routes';

const router = createRouter({
  // history 路由模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由表
  routes,
});

export default router;
