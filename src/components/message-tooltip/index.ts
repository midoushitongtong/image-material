import MessageTooltip from '@/components/message-tooltip/MessageTooltip.vue';
import { h, render } from 'vue';
import type { messageTooltipTypeStyle } from '../message-tooltip/data';

export const showMessageTooltip = (params: {
  type: keyof typeof messageTooltipTypeStyle;
  content: string;
  duration: number;
  onClose?: Function;
}) => {
  return new Promise<void>((resolve) => {
    // 1. 创建 container
    const container = document.createElement('div');
    // 2. 生成 vnode
    const vnode = h(MessageTooltip, {
      ...params,
      onClose: () => {
        // 移除 vnode (触发 onUnmounted 相关的生命周期)
        render(null, container);
        // 移除 container
        document.body.removeChild(container);
        if (params.onClose) {
          params.onClose();
        }
        resolve();
      },
    });
    // 3. 渲染 vnode 到 container
    render(vnode, container);
    // 4. 渲染 container
    document.body.appendChild(container);
  });
};
