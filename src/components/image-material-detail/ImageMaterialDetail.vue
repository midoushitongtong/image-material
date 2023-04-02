<script setup lang="ts">
import { getImageMaterialDetail } from '@/apis/imater-material';
import type { ImageMaterialDetail } from '@/apis/imater-material/types';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import MobileNavigationBar from '@/components/mobile-navigation-bar/MobileNavigationBar.vue';
import { useAppStore } from '@/store/resources/app';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showMessageTooltip } from '../message-tooltip';
import { useShare } from '@/hooks/share';

type Props = {
  id?: string;
};

// define props
const props = defineProps<Props>();

// app store
const appStore = useAppStore();
// device type
const deviceType = computed(() => appStore.deviceType);
// init data loading
const initDataLoading = ref(true);
// route
const route = useRoute();
// router
const router = useRouter();
// id
const id = computed(() => (route.params.id || props.id) as string);
// image material detail
const imageMaterialDetail = ref<ImageMaterialDetail>();
// share
const share = useShare();

// init data
const initData = async () => {
  try {
    initDataLoading.value = true;

    const result = await getImageMaterialDetail({
      id: id.value,
    });
    imageMaterialDetail.value = result.data;

    initDataLoading.value = false;
  } catch (error) {
    console.log(error);

    showMessageTooltip({
      type: 'warn',
      content: '服务器内部错误, 请稍后重试...',
      duration: 3000,
    });
  }
};

// handle right click
const handleRightClick = () => {};

// go back
const goBack = () => {
  router.back();
};

// share
const handleShare = () => {
  share.weibo({
    title: `这张图片不错哦，给大家分享一下 - ${imageMaterialDetail.value?.title}`,
    pic: imageMaterialDetail.value?.photo,
    url: location.href,
  });
};

// on mounted
onMounted(() => {
  initData();
});
</script>

<template>
  <div
    class="image-material-detial fixed top-0 left-0 w-full h-full z-20 backdrop-blur-3xl bg-transparent p-3 tablet:p-2 mobile:p-0 mobile:bg-white mobile:dark:bg-zinc-800 mobile:overflow-y-auto scrollbar"
  >
    <!-- 手机端头部 -->
    <MobileNavigationBar v-if="deviceType === 'MOBILE'">
      <template #right>
        <div
          class="cursor-pointer rounded-sm hover:bg-zinc-100 w-5 h-full absolute right-0 flex items-center justify-center"
          @click="handleRightClick"
        >
          <SVGIcon name="share" class="w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200" />
        </div>
      </template>
    </MobileNavigationBar>

    <template v-if="!initDataLoading && imageMaterialDetail">
      <!-- 电脑和平板显示: 关闭按钮 -->
      <SVGIcon
        v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'"
        name="close"
        class="w-4 h-4 p-1 cursor-pointer duration-200 rounded-sm hover:bg-zinc-200 absolute right-2 top-2"
        @click="goBack"
      />

      <!-- 主体内容 -->
      <div
        class="shadow-lg w-[80%] h-full mx-auto rounded-lg flex tablet:w-full mobile:w-full mobile:rounded-none mobile:block mobile:h-auto"
      >
        <img
          :src="imageMaterialDetail.photo"
          class="w-3/5 h-full object-cover rounded-tl-lg rounded-bl-lg mobile:rounded-none mobile:w-full mobile:h-auto"
        />
        <div
          class="pc-and-tablet:overflow-y-auto scrollbar w-2/5 h-full bg-white dark:bg-zinc-900 rounded-tr-lg rounded-br-lg mobile:h-auto mobile:bg-transparent p-3 mobile:px-0 mobile:py-3.5 mobile:dark:bg-transparent mobile:rounded-none mobile:w-full"
        >
          <!-- 电脑和平板显示: 收藏分享 -->
          <div
            v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'"
            class="flex justify-between mb-2"
          >
            <!-- 分享 -->
            <SVGIcon
              name="share"
              class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover-zinc-800 duration-300 rounded"
              @click="handleShare"
            />
            <!-- 收藏 -->
            <SVGIcon
              name="heart"
              class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover-zinc-800 duration-300 rounded"
            />
          </div>
          <!-- 标题 -->
          <p
            class="text-xl mb-5 text-zinc-900 dark:text-zinc-200 px-1 font-bold mobile:text-lg mobile:mb-3"
          >
            {{ imageMaterialDetail.title }}
          </p>
          <!-- 作者 -->
          <div class="flex items-center px-1">
            <img v-imageLazyLoad :src="imageMaterialDetail.avatar" class="w-3 h-3 rounded-full" />
            <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">
              {{ imageMaterialDetail.author }}
            </span>
          </div>
        </div>
      </div>
    </template>
    <!-- loading -->
    <div v-else class="w-full h-[calc(100%-theme(space.5))] p-2 flex items-center justify-center">
      <SVGIcon class="w-4 h-4 mx-auto animate-spin" name="infinite-load" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './ImageMaterialDetail.scss';
</style>
