import { useRouter } from 'vue-router';

/**
 * oauth 登录
 */
export const useOauth = () => {
  const router = useRouter();

  // qq 授权流程
  const qqAuthFlow = () => {
    // oauth url
    let oauthUrl = 'https://graph.qq.com/oauth2.0/authorize?';
    // oauth params
    const oauthParams = {
      response_type: 'code',
      client_id: '101564763',
      redirect_uri: 'http://yyccyy.com/oauth2.html',
      state: JSON.stringify({ a: '1' }),
    };
    // 拼接 GET 参数到 url
    Object.entries(oauthParams).forEach(([key, value], index) => {
      oauthUrl += `${key}=${value}&`;
      if (index !== Object.keys(oauthParams).length - 1) {
        oauthUrl += '&';
      }
    });

    // 跳转到 qq 授权页面
    // window.open(oauthUrl);

    // 模拟授权成功, 跳转到 redirect_uri
    router.push({
      name: 'Oauth',
      params: {
        state: JSON.stringify({
          authPlatform: 'qq',
        }),
      },
    });
  };

  return {
    qqAuthFlow,
  };
};
