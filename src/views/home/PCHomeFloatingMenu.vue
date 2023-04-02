<script setup lang="ts">
import Popover from '@/components/popover/Popover.vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { onMounted, ref } from 'vue';

const driver = ref<Driver | undefined>(undefined);

// on mounted
onMounted(() => {});

// 开始引导
const handleGuide = () => {
  // 初始化 Driver
  driver.value = new Driver({
    allowClose: false,
    closeBtnText: '关闭',
    doneBtnText: '完成',
    prevBtnText: '上一步',
    nextBtnText: '下一步',
    padding: 5,
  });
  // 定义引导步骤
  driver.value.defineSteps([
    {
      element: '.guide-home',
      popover: {
        title: 'Logo',
        description: '点击可以返回首页',
      },
    },
    {
      element: '.guide-search',
      popover: {
        title: '搜索',
        description: '搜索您期望的图片',
      },
    },
    {
      element: '.guide-theme',
      popover: {
        title: '风格',
        description: '选择一个您喜欢的风格',
        position: 'left',
      },
    },
    {
      element: '.guide-my',
      popover: {
        title: '账户',
        description: '这里标记了您的账户信息',
        position: 'left',
      },
    },
    {
      element: '.guide-feedback',
      popover: {
        title: '反馈',
        description: '您的任何建议可以在这里告诉我们',
        position: 'left',
      },
    },
    {
      element: '.guide-start',
      popover: {
        title: '引导',
        description: '这里可以再次查看引导信息',
        position: 'left',
      },
    },
  ]);
  // 开始引导用户
  driver.value?.start();
};

// 立即吐槽
const toFeedback = () => {
  window.open('https://support.qq.com/products/538637', '_blank', 'noopener,noreferrer');
};
</script>

<template>
  <div class="pc-home-floating-menu">
    <div class="fixed bottom-12 right-2 content-container">
      <!-- 引导页 -->
      <div
        class="group guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border border-solid border-zinc-100 dark:border-zinc-700 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg"
        @click="handleGuide"
      >
        <SVGIcon
          name="guide"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
        />
      </div>
      <!-- 反馈 -->
      <Popover class="flex items-center" placement="bottomRight">
        <div
          class="group guide-feedback w-4 h-4 bg-white dark:bg-zinc-900 border border-solid border-zinc-100 dark:border-zinc-700 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg"
        >
          <SVGIcon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          />
        </div>
        <template #content>
          <div class="w-[140px] overflow-hidden">
            <div
              class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
              @click="toFeedback"
            >
              <SVGIcon
                name="feedback"
                class="w-1.5 h-1.5 mr-1"
                fillClass="fill-zinc-900 dark:fill-zinc-300"
              />
              <span class="text-zainc-800 dark:text-zinc-300 text-sm"> 立即吐槽 </span>
            </div>
          </div>
        </template>
      </Popover>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHomeFloatingMenu.scss';
</style>
