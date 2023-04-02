<script setup lang="ts">
import { useRouter } from 'vue-router';
import SVGIcon from '../svg-icon/SVGIcon.vue';

type Props = {
  // 左侧按钮点击
  onLeftClick?: Function;
  // 右侧按钮点击
  onRightClick?: Function;
  // 是否吸顶
  sticky?: boolean;
};

// define props
const props = withDefaults(defineProps<Props>(), {
  sticky: true,
});

const router = useRouter();

// left click
const handleLeftClick = () => {
  if (props.onLeftClick) {
    props.onLeftClick();
    return;
  }
  router.back();
};
</script>

<template>
  <div :class="['mobie-navigaton-bar z-10', sticky ? 'sticky top-0 left-0' : 'relative']">
    <div
      class="w-full h-5 flex items-center border-b border-solid border-b-zinc-200 dark:border-b-zinc-700 bg-white dark:bg-zinc-800"
    >
      <!-- 左 -->
      <slot name="left">
        <div
          class="cursor-pointer rounded-sm hover:bg-zinc-100 w-5 h-full absolute left-0 flex items-center justify-center"
          @click="handleLeftClick"
        >
          <SVGIcon name="back" class="w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200" />
        </div>
      </slot>
      <!-- 中 -->
      <div
        class="w-full h-full px-6 flex items-center justify-center font-bold text-base text-zinc-900 dark:text-zinc-200"
      >
        <slot />
      </div>
      <!-- 右 -->
      <slot name="right"> </slot>
    </div>
  </div>
</template>

<style lang="scss">
@import './MobileNavigationBar.scss';
</style>
