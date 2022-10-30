import type { DeviceType } from './types';

/**
 * 监听屏幕宽度, 达到阈值 (桌面端, 平板端, 手机端) 后触发回调函数
 * @param callback
 */
export const deviceTypeEnquire = (callback: (deviceType: DeviceType) => void): void => {
  const matchMediaList = [
    window.matchMedia('screen and (min-width: 1200px)'),
    window.matchMedia('screen and (min-width: 768px) and (max-width: 1199px)'),
    window.matchMedia('screen and (max-width: 767px)'),
  ];

  const handlerMatchMedia = () => {
    if (matchMediaList[0].matches) {
      callback('DESKTOP');
    } else if (matchMediaList[1].matches) {
      callback('TABLET');
    } else if (matchMediaList[2].matches) {
      callback('MOBILE');
    }
  };

  // 页面首次加载, 强制匹配一次
  handlerMatchMedia();

  matchMediaList.forEach((matchMediaListItem) => {
    if (matchMediaListItem.addListener) {
      matchMediaListItem.addListener(handlerMatchMedia);
    } else if (matchMediaListItem.addEventListener) {
      matchMediaListItem.addEventListener('change', handlerMatchMedia);
    }
  });
};
