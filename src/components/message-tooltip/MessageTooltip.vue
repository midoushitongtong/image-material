<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import SVGIcon from '../svg-icon/SVGIcon.vue';
import { messageTooltipTypeStyle } from './data';

// define props
type Props = {
  // message 的类型
  type: keyof typeof messageTooltipTypeStyle;
  // 描述文本
  content: string;
  // 展示时长
  duration: number;
  // 关闭的回调
  onClose?: Function;
};
const props = defineProps<Props>();

// visible
const visible = ref(false);
// 动画时长
const transitionDuration = 300;
// css 动画时长
const cssTransitionDuration = computed(() => {
  return `${transitionDuration / 1000}s`;
});

// open message
const openTooltip = () => {
  visible.value = true;
};

// on mounted
onMounted(() => {
  openTooltip();

  // 定时关闭 message tooltip
  setTimeout(() => {
    visible.value = false;

    // 等待动画结束执行回调函数
    setTimeout(() => {
      if (props.onClose) {
        props.onClose();
      }
    }, transitionDuration);
  }, props.duration);
});
</script>

<template>
  <transition name="up-down">
    <div
      class="message-tooltip min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50"
      v-show="visible"
    >
      <div
        :class="[
          'flex',
          'items-center',
          'p-2',
          'rounded-sm',
          'border',
          'border-solid',
          'border-zinc-200',
          'cursor-pointer',
          messageTooltipTypeStyle[type].containerClass,
        ]"
      >
        <SVGIcon
          :name="messageTooltipTypeStyle[type].icon"
          :fillClass="messageTooltipTypeStyle[type].fillClass"
          class="w-1.5 h-1.5 mr-1.5"
        />
        <span :class="['text-sm flex-1', messageTooltipTypeStyle[type].textClass]">{{ content }}</span>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import './MessageTooltip.scss';
</style>

<style lang="scss" scoped>
// message 动画
.up-down-enter-active,
.up-down-leave-active {
  transition: all v-bind(cssTransitionDuration);
}
// 准备进入, 离开完成
.up-down-enter-from,
.up-down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
