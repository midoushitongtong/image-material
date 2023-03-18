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
  {
    path: '/user/profile',
    name: 'UserProfile',
    meta: {
      needAuth: true,
    },
    component: () => import('@/views/user/profile/Profile.vue'),
  },
  {
    path: '/membership-plan',
    name: 'MembershipPlan',
    component: () => import('@/views/membership-plan/MembershipPlan.vue'),
  },
  {
    path: '/oauth',
    name: 'Oauth',
    component: () => import('@/views/oauth/Oauth.vue'),
  },
];

export default routes;
