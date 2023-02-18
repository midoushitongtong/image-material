import { getUserInfo } from '@/apis/account';
import { useAccountStore } from '@/store/resources/account';
import { chechRouteNeedAuth } from '@/utils/router';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './resources/routes';

const router = createRouter({
  // history 路由模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由表
  routes,
});

router.beforeEach(async (to, from, next) => {
  // account store
  const accountStore = useAccountStore();
  // access token
  const accessToken = accountStore.accessToken;
  // user info
  const userInfo = accountStore.userInfo;

  // 处理已登录流程
  const handleSignedSuccess = () => {
    next();
  };

  // 处理未登录流程
  const handleNoSignInSuccess = () => {
    // 当前路由是否需要登录
    const needAuth = to.meta?.needAuth;

    if (needAuth) {
      // 拒绝访问
      next(false);
      // 退出登录
      accountStore.signOut();
      // 检测路由是否需要登录，如果需要跳转到登录页面
      chechRouteNeedAuth({
        route: to,
        showNeedAuthTooltip: true,
      });
    } else {
      // 正常访问
      next();
    }
  };

  if (accessToken) {
    if (userInfo) {
      handleSignedSuccess();
    } else {
      try {
        // 初始化用户信息
        const result = await getUserInfo();

        if (result.status !== '200') {
          throw new Error(`未知 status: ${result.status}`);
        }

        accountStore.updateUserInfo(result.data);

        handleSignedSuccess();
      } catch (error) {
        console.log(error);
        handleNoSignInSuccess();
      }
    }
  } else {
    handleNoSignInSuccess();
  }
});

export default router;
