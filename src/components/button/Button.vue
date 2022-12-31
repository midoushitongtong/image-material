<script setup lang="ts">
import { computed } from 'vue';
import { buttonSizeStyle, buttonTypeStyle } from './data';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';

// define props
const props = defineProps({
  // icon 图标
  iconName: {
    type: String,
  },
  // icon 颜色,
  iconColor: {
    type: String,
  },
  // icon 样式
  iconClass: {
    type: String,
  },
  // 按钮的风格
  type: {
    type: String,
    default: 'main',
    validator: (value: string) => {
      const keys = Object.keys(buttonTypeStyle);
      const result = keys.includes(value);
      if (!result) {
        throw new Error(`type 参数有误, 必须是 ${keys.join(', ')} 的其中一种`);
      }
      return result;
    },
  },
  // 按钮的大小
  size: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      const keys = Object.keys(buttonSizeStyle).filter((item) => !item.includes('icon'));
      const result = keys.includes(value);
      if (!result) {
        throw new Error(`size 参数有误, 必须是 ${keys.join(', ')} 的其中一种`);
      }
      return result;
    },
  },
  // 按钮点击时是否需要动画
  isActiveAnimate: {
    type: Boolean,
    default: true,
  },
  // 按钮加载状态
  loading: {
    type: Boolean,
    default: false,
  },
});

// define emits
const emits = defineEmits(['click']);

// 如果是 icon 按钮, 加上 size 前缀
// 传递了 iconName 参数, 就可以认为这是一个 icon 按钮
const formatSize = computed(() => {
  return props.iconName ? `icon-${props.size}` : props.size;
});

// handle click
const handleClick = (e: MouseEvent) => {
  if (props.loading) {
    return;
  }

  emits('click', e);
};
</script>

<template>
  <button
    :class="[
      'button',
      'text-sm',
      'text-center',
      'rounded',
      'duration-150',
      'flex',
      'items-center',
      'justify-center',
      'p-0.5',
      // @ts-ignore
      buttonTypeStyle[type],
      // @ts-ignore
      buttonSizeStyle[formatSize].button,
      isActiveAnimate && 'active:scale-105',
    ]"
    @click="handleClick"
  >
    <!-- loading -->
    <SVGIcon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1" />
    <!-- icon -->
    <SVGIcon
      v-if="iconName"
      :name="iconName"
      :color="iconColor"
      :class="[
        'm-auto',
        // @ts-ignore
        buttonSizeStyle[formatSize].icon,
      ]"
      :fillClass="iconClass"
    />
    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>

<style lang="scss" scoped>
@import './Button.scss'; ;
</style>
