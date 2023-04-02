import { getUserInfo } from '@/apis/account';
import { useAppStore } from '@/store/resources/app';
import { useAccountStore } from '@/store/resources/account';
import { chechRouteNeedAuth } from '@/utils/router';
import { createRouter, createWebHistory, type RouteLocationRaw, type RouteRecordName } from 'vue-router';
import routes from './resources/routes';

// 记录至少访问过一次的路由名称
const accessedRouteNames: (RouteRecordName | null | undefined)[] = [];

const router = createRouter({
  // history 路由模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由表
  routes,
  // 滚动条处理
  async scrollBehavior(to, from, savedPosition) {
    const appStore = useAppStore();
    const deviceType = appStore.deviceType;

    // 手机端因为有路由动画的原因, 滚动条重置到 0
    if (deviceType === 'MOBILE') {
      return {
        left: 0,
        top: 0,
      };
    }

    // 此页面重来没有被访问过, 滚动条重置到 0
    if (!accessedRouteNames.includes(to.name)) {
      accessedRouteNames.push(to.name);

      return {
        left: 0,
        top: 0,
      };
    }

    // 同一个页面, 不需要重置 (例如某些列表页面条件筛选的时候)
    if (to.name === from.name) {
      return false;
    }

    // 返回上一页的时候, 重置到原来保留的位置
    if (savedPosition) {
      return savedPosition;
    }

    // push 到新页面, 滚动条重置到 0
    return {
      left: 0,
      top: 0,
    };
  },
});

// 路由权限验证
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

// 记录历史路由 id
export const routerHistoryIdList: string[] = [];
// 重写 parmas
const rewriteParams = (params: any) => {
  const appStore = useAppStore();
  const deviceType = appStore.deviceType;
  const routerHistoryId = Math.random() + '';

  // 手机端: 需要记录历史路由 id
  if (deviceType === 'MOBILE') {
    // @ts-ignore
    params.query = {
      // @ts-ignore
      ...(params.query || {}),
      routerHistoryId,
    };
  }
};
// 原 push 方法
const originRouterPush = router.push;
// 原 replace 方法
const originRouterReplace = router.replace;
// 重写 push 方法
router.push = function routerPush(params: RouteLocationRaw) {
  rewriteParams(params);
  return originRouterPush.call(this, params);
};
// 重写 replace 方法
router.replace = function routerPush(params: RouteLocationRaw) {
  rewriteParams(params);
  return originRouterReplace.call(this, params);
};

export default router;
