<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import {
  placementTopLeft,
  placementTopCenter,
  placementTopRight,
  placementBottomLeft,
  placementBottomCenter,
  placementBottomRight,
  placementList,
} from './data';

// define props
const props = defineProps({
  placement: {
    type: String,
    default: placementTopCenter,
    validator: (value: string) => {
      const result = placementList.includes(value);
      if (!result) {
        throw new Error(`placement 参数有误， 必须是 ${placementList.join(', ')} 中的其中一种`);
      }
      return result;
    },
  },
});

// 延迟隐藏气泡定时器
let hiddenTimeout: any = null;
// ref
const triggerContainerRef = ref();
// ref
const contentContainerRef = ref();
// 气泡的样式
const contentContainerStyle = ref<{
  top?: string;
  right?: string;
  left?: string;
}>({
  top: undefined,
  right: undefined,
  left: undefined,
});

// 控制气泡显示/隐藏
const visible = ref(false);

// 处理鼠标移入
const handleMouseEnter = () => {
  visible.value = true;
  if (hiddenTimeout) {
    clearTimeout(hiddenTimeout);
  }
};

// 处理鼠标移出
const handleMouseLeave = () => {
  // 延迟一段时间在隐藏气泡
  hiddenTimeout = setTimeout(() => {
    visible.value = false;
    hiddenTimeout = null;
  }, 100);
};

// 气泡显示的时候，计算气泡展示的位置
watch(visible, (newValue) => {
  if (!newValue) {
    return;
  }
  // 等待 dom 渲染完成
  nextTick(() => {
    const trigggertContainerWidth = triggerContainerRef.value.offsetWidth;
    const trigggertContainerHeight = triggerContainerRef.value.offsetHeight;
    const contentContainerWidth = contentContainerRef.value.offsetWidth;
    const contentContainerHeight = contentContainerRef.value.offsetHeight;

    switch (props.placement) {
      // 左上
      case placementTopLeft:
        contentContainerStyle.value.top = `${-contentContainerHeight}px`;
        contentContainerStyle.value.right = undefined;
        contentContainerStyle.value.left = '0px';
        break;
      // 上居中
      case placementTopCenter:
        contentContainerStyle.value.top = `${-contentContainerHeight}px`;
        contentContainerStyle.value.right = undefined;
        contentContainerStyle.value.left = `${-(
          (contentContainerWidth - trigggertContainerWidth) /
          2
        )}px`;
        break;
      // 右上
      case placementTopRight:
        contentContainerStyle.value.top = `${-contentContainerHeight}px`;
        contentContainerStyle.value.right = '0px';
        contentContainerStyle.value.left = undefined;
        break;
      // 左下
      case placementBottomLeft:
        contentContainerStyle.value.top = `${trigggertContainerHeight}px`;
        contentContainerStyle.value.right = undefined;
        contentContainerStyle.value.left = '0px';
        break;
      // 下居中
      case placementBottomCenter:
        contentContainerStyle.value.top = `${trigggertContainerHeight}px`;
        contentContainerStyle.value.right = undefined;
        contentContainerStyle.value.left = `${-(
          (contentContainerWidth - trigggertContainerWidth) /
          2
        )}px`;
        break;
      // 右下
      case placementBottomRight:
        contentContainerStyle.value.top = `${trigggertContainerHeight}px`;
        contentContainerStyle.value.right = '0px';
        contentContainerStyle.value.left = undefined;
        break;
    }
  });
});
</script>

<template>
  <div class="relative" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="trigger-container" ref="triggerContainerRef">
      <!-- 匿名插槽, 触发气泡显示的视图 -->
      <slot />
    </div>

    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        v-show="visible"
        ref="contentContainerRef"
        class="content-container absolute z-20"
        :style="contentContainerStyle"
      >
        <!-- 具名插槽: 气泡视图展示的内容 -->
        <div
          class="content p-1 bg-white dark:bg-zinc-900 border border-solid border-zinc-200 dark:border-zinc-700 rounded-md"
        >
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import './Popover.scss'; ;
</style>
