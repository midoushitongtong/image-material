import { THEME_LIGHT, THEME_DARK } from '@/constants';

// 修改主题
export const updateHTMLThemeType = (themeType: string) => {
  document.documentElement.classList.remove('light');
  document.documentElement.classList.remove('dark');

  let theme = 'light';

  switch (themeType) {
    case THEME_LIGHT:
      theme = 'light';
      break;
    case THEME_DARK:
      theme = 'dark';
      break;
  }

  document.documentElement.classList.add(theme);
};

// 监听系统主题
export const themeTypeEnquire = (callback: (themeType: string) => void) => {
  const meatchMedia = window.matchMedia('(prefers-color-scheme: dark)');

  const handlerMatchMedia = () => {
    if (meatchMedia.matches) {
      callback(THEME_DARK);
    } else {
      callback(THEME_LIGHT);
    }
  };

  // 页面首次加载, 强制匹配一次
  handlerMatchMedia();

  if (meatchMedia.addListener) {
    meatchMedia.addListener(handlerMatchMedia);
  } else if (meatchMedia.addEventListener) {
    meatchMedia.addEventListener('change', handlerMatchMedia);
  }
};
