<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import dayjs from 'dayjs';

// define props
type Props = {
  // 时间戳
  endTime: dayjs.Dayjs;
  // 循环 dayjs format 标准
  format?: string;
};
const props = withDefaults(defineProps<Props>(), {
  format: 'HH:mm:ss',
});

// define emits
const emits = defineEmits<{
  (_name: 'onFinish'): void;
}>();

// 定时器实例
let interval: NodeJS.Timer | null = null;
// 定时器多久执行一次
const intervalCount = 1000;
// 当前时间
const currentTime = ref(dayjs());
// showTime
const showTime = computed(() => {
  // 毫秒
  const microsecond = props.endTime.toDate().getTime() - currentTime.value.toDate().getTime();

  let second: string | number = Math.floor((microsecond / 1000) % 60);
  let minute: string | number = Math.floor((microsecond / (1000 * 60)) % 60);
  let hour: string | number = Math.floor((microsecond / (1000 * 60 * 60)) % 24);

  // 防止负数
  second = Math.max(0, second);
  minute = Math.max(0, minute);
  hour = Math.max(0, hour);

  // 补 0
  second = second.toString().padStart(2, '0');
  minute = minute.toString().padStart(2, '0');
  hour = hour.toString().padStart(2, '0');

  return `${hour}:${minute}:${second}`;
});

// 开始倒计时
const start = () => {
  // 还原时间
  currentTime.value = dayjs();
  // 开始前先清空倒计时
  end();

  // 设置定时器
  interval = setInterval(() => {
    currentTime.value = dayjs();
    if (currentTime.value.toDate().getTime() >= props.endTime.toDate().getTime()) {
      end();
      emits('onFinish');
    }
  }, intervalCount);
};

// 清空倒计时
const end = () => {
  if (interval) {
    clearInterval(interval);
  }
};

// 开始倒计时
watch(
  () => props.endTime,
  () => {
    start();
  },
  {
    immediate: true,
  }
);

// 组件卸载, 清空倒计时
onUnmounted(() => {
  end();
});
</script>

<template>
  <div class="count-down">
    {{ showTime }}
  </div>
</template>

<style lang="scss" scoped>
@import './CountDown.scss';
</style>
