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
export const themeTypeEnquire = (props: {
  callback: (themeType: string) => void;
  addListener: boolean;
}) => {
  const meatchMedia = window.matchMedia('(prefers-color-scheme: dark)');

  const handlerMatchMedia = () => {
    if (meatchMedia.matches) {
      props.callback(THEME_DARK);
    } else {
      props.callback(THEME_LIGHT);
    }
  };

  // 页面首次加载, 强制匹配一次
  handlerMatchMedia();

  if (props.addListener) {
    if (meatchMedia.addListener) {
      meatchMedia.addListener(handlerMatchMedia);
    } else if (meatchMedia.addEventListener) {
      meatchMedia.addEventListener('change', handlerMatchMedia);
    }
  }
};
