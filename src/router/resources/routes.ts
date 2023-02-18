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
    component: () => import('@/views/image-material-detail/ImageMaterialDetail.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    redirect: () => {
      return {
        name: 'AccountSignIn',
      };
    },
    children: [
      {
        path: '/account/sign-in',
        name: 'AccountSignIn',
        component: () => import('@/views/account/sign-in/SignIn.vue'),
      },
      {
        path: '/account/sign-up',
        name: 'AccountSignUp',
        component: () => import('@/views/account/sign-up/SignUp.vue'),
      },
    ],
  },
];

export default routes;
