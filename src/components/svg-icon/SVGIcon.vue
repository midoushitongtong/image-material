<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  // 显示的 svg
  name: string;
  // svg 图标的颜色
  color?: string;
  // tailwind 指定 svg 颜色的类名
  fillClass?: string;
};

// define props
const props = defineProps<Props>();

// 真实显示的 svg 图标
const symbolId = computed(() => `#icon-${props.name}`);
</script>

<template>
  <svg aria-hidden="true">
    <!-- 复制插件生成好的 svg 图标 -->
    <use :href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped>
@import './SVGIcon.scss'; ;
</style>
