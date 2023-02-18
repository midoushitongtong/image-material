import { useAccountStore } from '@/store/resources/account';
import axios from 'axios';
import router from '@/router';
import { chechRouteNeedAuth } from '../router';

const instance = axios.create({
  timeout: 5000,
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use((config) => {
  // account store
  const accountStore = useAccountStore();
  // access token
  const accessToken = accountStore.accessToken;

  // 防止 headers 为 undefined
  if (!config.headers) {
    config.headers = {};
  }

  // 携带 accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // account store
    const accountStore = useAccountStore();

    // access token 超时
    if (error.response.status === 401) {
      // 退出登录
      accountStore.signOut();
      // 检测路由是否需要登录，如果需要跳转到登录页面
      chechRouteNeedAuth({
        route: router.currentRoute.value,
        showNeedAuthTooltip: true,
      });
    }
  }
);

export default instance;
