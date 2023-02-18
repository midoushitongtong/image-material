import router from '@/router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

/**
 * 检测路由是否需要登录，如果需要跳转到登录页面
 */
export const chechRouteNeedAuth = (params: {
  route: RouteLocationNormalizedLoaded;
  showNeedAuthTooltip: boolean;
}) => {
  const { route, showNeedAuthTooltip } = params;

  // 当前路由是否需要登录
  const needAuth = route.meta?.needAuth;
  if (needAuth) {
    if (route.name !== 'AccountSignIn') {
      // 跳转登录页
      router.push({
        name: 'AccountSignIn',
        query: {
          showNeedAuthTooltip: showNeedAuthTooltip ? 'true' : undefined,
        },
      });
    }
  }
};
