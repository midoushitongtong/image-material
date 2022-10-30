import { useWindowSize } from '@vueuse/core';
import { watch, ref } from 'vue';

// 最大的 fontSize
const MAX_FONT_SIZE = 40;

/**
 * 根据屏幕宽度动态计算 rem 基准值, 并将计算出来的值赋值给 html 标签
 */
export const useFonSize = () => {
  // font size
  const fontSize = ref(0);

  // window size
  const { width } = useWindowSize();

  // refresh font sie
  const refreshFontSize = () => {
    // 拿到 html 标签
    const html = document.querySelector('html') as HTMLHtmlElement;
    // 计算 fontSize
    let fontSizeTemp = window.innerWidth / 10;
    fontSizeTemp = fontSizeTemp > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSizeTemp;
    fontSize.value = fontSizeTemp;
    // 赋值给 html
    html.style.fontSize = `${fontSize.value}px`;
  };

  watch(width, refreshFontSize, {
    immediate: true,
  });

  return {
    fontSize,
  };
};
