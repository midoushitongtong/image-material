<script setup lang="ts">
import { computed } from 'vue';
import { buttonSizeStyle, buttonTypeStyle } from './data';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';

// define props
type Props = {
  // icon 图标
  iconName?: string;
  // icon 颜色,
  iconColor?: string;
  // icon 样式
  iconClass?: string;
  // 按钮的风格
  type?: keyof typeof buttonTypeStyle;
  // 按钮的大小
  size?: 'default' | 'small';
  // 按钮点击时是否需要动画
  isActiveAnimate?: boolean;
  // 按钮加载状态
  loading?: boolean;
  // html type
  htmlType?: 'button' | 'submit' | 'reset';
};
const props = withDefaults(defineProps<Props>(), {
  type: 'main',
  size: 'default',
  isActiveAnimate: false,
  loading: false,
  htmlType: 'button',
});

// define emits
const emits = defineEmits<{
  (_name: 'click', _event: MouseEvent): void;
}>();

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
      'button outline-none text-sm text-center rounded duration-150 flex items-center justify-center p-0.5',
      // @ts-ignore
      buttonTypeStyle[type],
      // @ts-ignore
      buttonSizeStyle[formatSize].button,
      isActiveAnimate && 'active:scale-105',
    ]"
    @click="handleClick"
    :type="htmlType"
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
