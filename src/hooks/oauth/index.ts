import { broadcastEmitter } from '@/utils/broadcast';
import { useRouter } from 'vue-router';

/**
 * oauth 登录
 */
export const useOauth = () => {
  const router = useRouter();

  // qq 授权流程
  const qqAuthFlow = () => {
    // target url
    let targetUrl = 'https://graph.qq.com/oauth2.0/authorize?';
    // url params
    const urlParams = {
      response_type: 'code',
      client_id: '101564763',
      redirect_uri: 'http://yyccyy.com/oauth2.html',
      state: JSON.stringify({ a: '1' }),
    };
    // 拼接 GET 参数到 url
    const urlParamsArr: string[] = [];
    Object.entries(urlParams).forEach(([key, value]) => {
      urlParamsArr.push(`${key}=${value}`);
    });
    targetUrl += urlParamsArr.join('&');

    // 跳转到 qq 授权页面
    // window.open(targetUrl, '_blank', 'noopener,noreferrer');

    // 模拟授权成功, 跳转到 redirect_uri
    const mockSuccessOauthSuccessUrl = router.resolve({
      name: 'Oauth',
      query: {
        state: JSON.stringify({
          authPlatform: 'qq',
        }),
      },
    }).fullPath;
    window.open(mockSuccessOauthSuccessUrl, '_blank', 'noopener,noreferrer');
  };

  // weixin 授权流程
  const weixinAuthFlow = () => {
    // target url
    let targetUrl = ' https://open.weixin.qq.com/connect/qrconnect?';
    // url params
    const urlParams = {
      appid: '123',
      response_type: 'code',
      redirect_uri: 'http://yyccyy.com/oauth2.html',
      state: JSON.stringify({ a: '1' }),
      scope: 'snsapi_login',
    };
    // 拼接 GET 参数到 url
    const urlParamsArr: string[] = [];
    Object.entries(urlParams).forEach(([key, value]) => {
      urlParamsArr.push(`${key}=${value}`);
    });
    targetUrl += urlParamsArr.join('&');

    // 跳转到 weixin 授权页面
    // window.open(targetUrl, '_blank', 'noopener,noreferrer');

    // 模拟授权成功, 跳转到 redirect_uri
    const mockSuccessOauthSuccessUrl = router.resolve({
      name: 'Oauth',
      query: {
        state: JSON.stringify({
          authPlatform: 'weixin',
        }),
      },
    }).fullPath;
    window.open(mockSuccessOauthSuccessUrl, '_blank', 'noopener,noreferrer');
  };

  // 监听第三方登录成功, 刷新页面
  const listenAuthSuccess = () => {
    broadcastEmitter.on('oauthSuccess', () => {
      window.location.reload();
    });
  };

  return {
    listenAuthSuccess,
    qqAuthFlow,
    weixinAuthFlow,
  };
};
