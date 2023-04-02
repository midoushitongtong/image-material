// 分享相关方法
export const useShare = () => {
  // 微博分享
  const weibo = (params: { url?: string; title?: string; pic?: string }) => {
    // target url
    let targetUrl = 'http://service.weibo.com/share/share.php?';
    // url params
    const urlParams = {
      appkey: '2766934311',
      ...params,
    };
    // 拼接 GET 参数到 url
    const urlParamsArr: string[] = [];
    Object.entries(urlParams).forEach(([key, value]) => {
      urlParamsArr.push(`${key}=${value}`);
    });
    targetUrl += urlParamsArr.join('&');

    // 跳转到微博分享页面
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return {
    weibo,
  };
};
