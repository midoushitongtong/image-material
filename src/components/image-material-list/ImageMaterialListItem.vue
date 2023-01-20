<script setup lang="ts">
import Button from '@/components/button/Button.vue';
import type { ImageMaterialListItem } from '@/apis/imater-material/types';
import { computed } from 'vue';
import { randomColor } from '@/utils/random';
// @ts-ignore
import FileSaver from 'file-saver';
import { showMessageTooltip } from '../message-tooltip';

// define props
type Props = {
  imageMaterialListItem: ImageMaterialListItem;
  containerWidth: number;
};
const props = defineProps<Props>();

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
</script>

<template>
  <div class="image-material-list-item bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div class="relative w-full rounded cursor-zoom-in group">
      <!-- 图片 -->
      <img
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
        <Button class="absolute top-1.5 left-1.5">分享</Button>
        <!-- 点赞 -->
        <Button
          class="absolute top-1.5 right-1.5"
          type="info"
          iconName="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
        <!-- 下载 -->
        <Button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          iconName="download"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="handleDownload"
        />
        <!-- 全屏 -->
        <Button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          iconName="full"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
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
  </div>
</template>

<style lang="scss" scoped>
@import './ImageMaterialListItem.scss';
</style>
