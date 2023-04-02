<script setup lang="ts">
import Button from '@/components/button/Button.vue';
import type { ImageMaterialListItem } from '@/apis/imater-material/types';
import { computed, onUnmounted, ref, watch } from 'vue';
import { randomColor } from '@/utils/random';
// @ts-ignore
import FileSaver from 'file-saver';
import { showMessageTooltip } from '../message-tooltip';
import { useElementBounding, useEventListener, useFullscreen, useScroll } from '@vueuse/core';
import ImageMaterialDetail from '@/components/image-material-detail/ImageMaterialDetail.vue';
import gsap from 'gsap';
import { useRouter } from 'vue-router';

type Props = {
  imageMaterialListItem: ImageMaterialListItem;
  containerWidth: number;
};

// define props
const props = defineProps<Props>();

// router
const router = useRouter();
// 滚动条高度
const scroll = useScroll(document.querySelector('.pc-home-content .scrollbar') as any);
// img ref
const imgRef = ref();
// img 边界信息
const imgElementBounding = useElementBounding(imgRef);
// img 中心点位置
const imgCenterPosition = computed(() => {
  return {
    translateX: imgElementBounding.x.value + imgElementBounding.width.value / 2,
    translateY: imgElementBounding.y.value + imgElementBounding.height.value / 2,
  };
});
// 显示/隐藏详情
const visibleDetail = ref(false);
// 监听浏览器后退事件, 隐藏详情
useEventListener(window, 'popstate', () => {
  visibleDetail.value = false;
});
// 图片布局
const imageLayout = computed(() => {
  // 图片的大小
  const width = props.imageMaterialListItem.photoWidth;
  const height = props.imageMaterialListItem.photoHeight;
  // 根据容器宽度，等比例缩放图片大小
  const imageWidth = width * (props.containerWidth / width);
  const imageHeight = height * (props.containerWidth / width);
  return {
    imageWidth: width ? imageWidth + 'px' : 'auto',
    imageHeight: height ? imageHeight + 'px' : 'auto',
  };
});

// 下载
const handleDownload = async () => {
  showMessageTooltip({
    type: 'success',
    content: '正在准备下载图片...',
    duration: 3000,
  });

  // 延迟一段时间执行, 先让 message tooltip 展示给用户看一下先
  setTimeout(() => {
    FileSaver.saveAs(props.imageMaterialListItem.photoDownLink);
  }, 500);
};

// 全屏
const handleFullscreen = () => {
  const fullscreen = useFullscreen(imgRef);
  fullscreen.enter();
};

// 跳转详情页
const handleItemClick = () => {
  // 显示详情
  visibleDetail.value = true;
  // 添加一条浏览器会话历史
  history.pushState(null, '', `/image-material/${props.imageMaterialListItem.id}`);
};

// 动画处理 - 进入之前
const handleBeforeEnter = (el: any) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: imgCenterPosition.value.translateX,
    translateY: imgCenterPosition.value.translateY,
    opacity: 0,
  });
};

// 动画处理 - 进入
const handleEnter = (el: any, done: any) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    transformOrigin: '0 0',
    translateX: 0,
    translateY: 0,
    opacity: 1,
    onComplete: done,
  });
};

// 动画处理 - 离开
const handleLeave = (el: any, done: any) => {
  gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    translateX: imgCenterPosition.value.translateX,
    translateY: imgCenterPosition.value.translateY,
    opacity: 0,
    onComplete: done,
  });
};

// 监听滚动条，刷新 img 边界信息
watch(() => scroll.y.value, imgElementBounding.update);

// 组件卸载，移除浏览器会话历史
onUnmounted(() => {
  const imageMaterialDetail = document.querySelector('.image-material-detial') as
    | HTMLDivElement
    | undefined;

  if (visibleDetail.value && !imageMaterialDetail) {
    router.back();
  }
});
</script>

<template>
  <div class="image-material-list-item bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div class="relative w-full rounded cursor-pointer group" @click="handleItemClick">
      <!-- 图片 -->
      <img
        ref="imgRef"
        v-imageLazyLoad
        class="w-full rounded bg-transparent"
        :src="imageMaterialListItem.photo"
        :style="{
          width: imageLayout.imageWidth,
          height: imageLayout.imageHeight,
          backgroundColor: randomColor(),
        }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden md:block opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100"
      >
        <!-- 分享 -->
        <Button class="absolute top-1.5 left-1.5" @click.stop="() => {}">分享</Button>
        <!-- 点赞 -->
        <Button
          class="absolute top-1.5 right-1.5"
          type="info"
          iconName="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click.stop="() => {}"
        />
        <!-- 下载 -->
        <Button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          iconName="download"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click.stop="handleDownload"
        />
        <!-- 全屏 -->
        <Button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          iconName="full"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click.stop="handleFullscreen"
        />
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ imageMaterialListItem.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-imageLazyLoad class="w-2 h-2 rounded-full" :src="imageMaterialListItem.avatar" />
      <span class="text-sm text-zinc-500 ml-1">{{ imageMaterialListItem.author }}</span>
    </div>

    <!-- 详情 -->
    <transition @beforeEnter="handleBeforeEnter" @enter="handleEnter" @leave="handleLeave" :css="false">
      <ImageMaterialDetail v-if="visibleDetail" :id="imageMaterialListItem.id" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import './ImageMaterialListItem.scss';
</style>
