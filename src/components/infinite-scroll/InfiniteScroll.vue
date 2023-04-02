<script setup lang="ts">
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { useIntersectionObserver } from '@vueuse/core';
import { ref, watch } from 'vue';

type Props = {
  // 是否处于加载状态
  loading: boolean;
  // 数据是否全部加载完成
  isFinished?: boolean;
};

// define props
const props = withDefaults(defineProps<Props>(), {
  isFinished: false,
});

// define emits
const emits = defineEmits<{
  (_name: 'onLoad'): void;
  (_name: 'update:loading'): void;
}>();

// 滚动的元素
const loadingRef = ref(null);
// 是否交叉状态
const loadingRefIsIntersecting = ref(false);

// emit load
const emitLoad = () => {
  if (loadingRefIsIntersecting.value && !props.loading && !props.isFinished) {
    // 标记为加载中
    emits('update:loading');
    // 通知父组件加载数据
    emits('onLoad');
  }
};

// 监听元素是否可见
useIntersectionObserver(loadingRef, ([{ isIntersecting }]) => {
  loadingRefIsIntersecting.value = isIntersecting;
  emitLoad();
});

// 监听 loading 的变化
// 解决数据加载完成，首屏未铺满的情况
watch(
  () => props.loading,
  async () => {
    // 等待 loadingRefIsIntersecting 状态更新
    setTimeout(() => {
      emitLoad();
    }, 1000);
  }
);
</script>

<template>
  <div class="infinite-scroll">
    <!-- 内容 -->
    <slot />

    <!-- loading -->
    <div ref="loadingRef" class="py-5 px-2">
      <!-- loading icon -->
      <SVGIcon v-show="loading" class="w-4 h-4 mx-auto animate-spin" name="infinite-load" />
      <!-- 没有更多数据 -->
      <div v-if="isFinished" class="text-center text-base text-zinc-400">没有更多数据了!</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './InfiniteScroll.scss';
</style>
