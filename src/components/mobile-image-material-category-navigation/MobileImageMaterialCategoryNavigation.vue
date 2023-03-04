<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { useScroll } from '@vueuse/core';
import MobileImageMaterialCategoryNavigationModal from './MobileImageMaterialCategoryNavigationModal.vue';
import { useFonSize } from '@/hooks/use-font-size';
import { scrollTo } from '@/utils/dom';
import type { ImageMaterialCategoryListItem } from '@/apis/image-material-category/types';

// props
type Props = {
  imageMaterialCategoryList: ImageMaterialCategoryListItem[];
  activeCategoryId: string;
};
const props = defineProps<Props>();

// define emits
const emits = defineEmits<{
  (_name: 'onCategoryListItemClick', _id: string): void;
}>();

// modal ref
const mobileImageMaterialCategoryNavigationModalRef = ref();
// slider style
const sliderStyle = ref({
  transform: 'translateX(0px) translateY(0px)',
  width: '0px',
  height: '0px',
});
// slider activeCategoryId (需要延迟更新, 防止动画卡顿)
const sliderActiveCategoryId = ref(props.activeCategoryId);
// category ref
const categoryRefList = ref<HTMLDivElement[]>([]);
// category list ref
const categoryListRef = ref<HTMLDivElement | undefined>(undefined);
// 列表横向滚动距离
const { x: categoryListScrollLeft } = useScroll(categoryListRef);
// font size
const { fontSize } = useFonSize();

// 刷新 slider 样式
const refreshSliderStyle = () => {
  if (!categoryListRef.value) {
    return;
  }

  const activeCategoryId = props.activeCategoryId;
  const categoryListRect = categoryListRef.value.getBoundingClientRect();
  const itemRect =
    categoryRefList.value[
      props.imageMaterialCategoryList.findIndex((item) => item.id === activeCategoryId)
    ].getBoundingClientRect();
  // 需要减去容器的 left (不减去路由动画会有 bug)
  const itemLeft = itemRect.left - categoryListRect.left;

  sliderStyle.value = {
    // 滑块的位置 = 列表横向滚动的距离 + 当前元素的 left - 列表的 padding
    // 计算滑块位置的其他思路：使用当前元素的 offsetLeft 直接计算也是可以的
    transform: `translateX(${categoryListScrollLeft.value + itemLeft - 10}px)`,
    width: `${itemRect.width}px`,
    height: 'calc(100% - 0.25rem - 10px)',
  };

  // 滚动到当前元素
  scrollTo({
    element: categoryListRef.value,
    top: 0,
    left: categoryListScrollLeft.value + itemLeft - 150,
    duration: 200,
  });

  // 更新 sliderActiveCategoryId
  sliderActiveCategoryId.value = activeCategoryId;
};

// 收集 category ref
const setCategoryRef = (index: number, ref?: any) => {
  categoryRefList.value[index] = ref;
};

// 更新当前下标
const updateCurrentCategoryId = (id: string) => {
  emits('onCategoryListItemClick', id);
};

// 显示 modal
const showMobileImageMaterialCategoryNavigationModal = () => {
  mobileImageMaterialCategoryNavigationModalRef.value.initModal({
    imageMaterialCategoryList: props.imageMaterialCategoryList,
    activeCategoryId: props.activeCategoryId,
    onCategoryListItemClick: updateCurrentCategoryId,
  });
};

// 下标修改, 刷新 slider 样式
watch(
  () => props.activeCategoryId,
  () => {
    setTimeout(() => {
      refreshSliderStyle();
    }, 300);
  }
);

// fontSize 修改, 刷新 slider 样式
watch(fontSize, () => {
  // 延迟等待字体刷新完成
  setTimeout(() => {
    refreshSliderStyle();
  }, 1000);
});

// on mounted
onMounted(() => {
  refreshSliderStyle();
});
</script>

<template>
  <div class="mobile-image-material-category-navigation sticky top-0 left-0 z-10 overflow-hidden">
    <div class="bg-white dark:bg-zinc-900 duration-500 flex">
      <!-- 菜单列表 -->
      <div
        ref="categoryListRef"
        class="relative flex items-center overflow-x-auto p-[10px] text-xs text-zinc-600"
      >
        <div
          v-for="(item, index) of imageMaterialCategoryList"
          :key="item.id"
          :ref="(ref) => setCategoryRef(index, ref)"
          :class="[
            'shrink-0',
            'px-1.5',
            'py-0.5',
            'z-10',
            'duration-200',
            item.id === sliderActiveCategoryId && 'text-zinc-100',
          ]"
          @click="updateCurrentCategoryId(item.id)"
        >
          {{ item.name }}
        </div>
        <!-- 滑块 -->
        <div
          class="absolute bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
          :style="sliderStyle"
        />
      </div>
      <!-- 汉堡按钮 -->
      <div
        class="px-1 flex items-center justify-center bg-white dark:bg-zinc-900 z-10 shadow-l-white dark:shadow-l-zinc"
        @click="showMobileImageMaterialCategoryNavigationModal"
      >
        <SVGIcon name="hamburger" class="w-1.5 h-1.5" />
      </div>

      <!-- 菜单 modal, 点击按钮弹出 -->
      <MobileImageMaterialCategoryNavigationModal ref="mobileImageMaterialCategoryNavigationModalRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MobileImageMaterialCategoryNavigation.scss';
</style>
