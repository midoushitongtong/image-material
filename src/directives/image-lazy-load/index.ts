import { useIntersectionObserver } from '@vueuse/core';
import type { App } from 'vue';

const imageLazyLoad = {
  install: (app: App) => {
    // 图片懒加载指令，用户看得到图片，才加载，用户看不到图片，不加载图片
    app.directive('imageLazyLoad', {
      mounted(el: HTMLImageElement) {
        // 1. 保存 img 的原数据
        const imageOrignData = {
          src: el.src,
        };
        // 2. 设置 img 的 placeholder 图片
        el.src = '/image-placeholder.png';

        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 3. 图片可见时，加载图片
            el.src = imageOrignData.src;
            // 4. 停止监听
            stop();
          }
        });
      },
    });
  },
};

export default imageLazyLoad;
