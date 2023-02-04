<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { useScroll } from '@vueuse/core';
import Modal from '@/components/modal/Modal.vue';
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
  // eslint-disable-next-line no-unused-vars
  (name: 'onCategoryListItemClick', id: string): void;
}>();

// slider style
const sliderStyle = ref({
  transform: 'translateX(0px) translateY(0px)',
  width: '0px',
  height: '0px',
});
// category ref
const categoryRefList = ref<HTMLDivElement[]>([]);
// category list ref
const categoryListRef = ref<HTMLDivElement | undefined>(undefined);
// 列表横向滚动距离
const { x: categoryListScrollLeft } = useScroll(categoryListRef);
// 控制 modal 显示隐藏
const visibleCategoryModal = ref(false);
// font size
const { fontSize } = useFonSize();

// 刷新 slider 样式
const refreshSliderStyle = () => {
  if (!categoryListRef.value) {
    return;
  }

  const rect =
    categoryRefList.value[
      props.imageMaterialCategoryList.findIndex((item) => item.id === props.activeCategoryId)
    ].getBoundingClientRect();

  sliderStyle.value = {
    // 滑块的位置 = 列表横向滚动的距离 + 当前元素的 left - 列表的 padding
    // 计算滑块位置的其他思路：使用当前元素的 offsetLeft 直接计算也是可以的
    transform: `translateX(${categoryListScrollLeft.value + rect.left - 10}px)`,
    width: `${rect.width}px`,
    height: 'calc(100% - 0.25rem - 10px)',
  };

  // 滚动到当前元素
  scrollTo({
    element: categoryListRef.value,
    top: 0,
    left: categoryListScrollLeft.value + rect.left - 150,
    duration: 200,
  });
};

// 收集 category ref
const setCategoryRef = (index: number, ref?: any) => {
  categoryRefList.value[index] = ref;
};

// 更新当前下标
const updateCurrentCategoryId = (id: string) => {
  emits('onCategoryListItemClick', id);
  visibleCategoryModal.value = false;
};

// 下标修改, 刷新 slider 样式
watch(
  () => props.activeCategoryId,
  () => {
    refreshSliderStyle();
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
            item.id === activeCategoryId && 'text-zinc-100',
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
        @click="visibleCategoryModal = true"
      >
        <SVGIcon name="hamburger" class="w-1.5 h-1.5" />
      </div>

      <!-- 菜单 modal, 点击按钮弹出 -->
      <Modal v-model:visible="visibleCategoryModal">
        <MobileImageMaterialCategoryNavigationModal
          :imageMaterialCategoryList="imageMaterialCategoryList"
          :activeCategoryId="activeCategoryId"
          @onCategoryListItemClick="updateCurrentCategoryId"
        />
      </Modal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MobileImageMaterialCategoryNavigation.scss';
</style>
