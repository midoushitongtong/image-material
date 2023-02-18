<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SVGIcon from '../svg-icon/SVGIcon.vue';
import './slider-captcha/longbow.slidercaptcha.js';

// define emits
const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (name: 'success'): void;
  // eslint-disable-next-line no-unused-vars
  (name: 'close'): void;
}>();

// captcha ref
const captchaRef = ref();

// refresh
const refresh = () => {
  captchaRef.value.reset();
};

// close
const close = () => {
  emits('close');
};

// init data
const initData = () => {
  // @ts-ignore
  captchaRef.value = sliderCaptcha({
    id: 'captcha',
    width: 315,
    height: 175,
    onSuccess: () => {
      console.log('验证成功');
      emits('success');
    },
    onFail: () => {
      console.log('验证失败');
    },
  });
};

// on mounted
onMounted(() => {
  initData();
});
</script>

<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[350px] h-[300px] text-sm bg-white dark:bg-zinc-800 rounded border border-solid border-zinc-200 dark:border-zinc-900 shadow-2xl"
  >
    <!-- 头 -->
    <div class="flex items-center py-1 px-1.5 text-left mb-1">
      <span class="flex-grow dark:text-zinc-200"> 请完成安全验证 </span>
      <SVGIcon
        name="refresh"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="refresh"
      />
      <SVGIcon
        name="close"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="close"
      />
    </div>

    <!-- captcha -->
    <div id="captcha"></div>
  </div>
</template>

<style lang="css">
@import './slider-captcha/slidercaptcha.css';
</style>

<style lang="scss" scoped>
@import './SliderCaptcha.scss'; ;
</style>
