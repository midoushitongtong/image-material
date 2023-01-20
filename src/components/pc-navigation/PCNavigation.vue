<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { useWindowSize } from '@vueuse/core';
import type { CategoryListItem } from '@/apis/category/types';

// props
type Props = {
  categoryList: CategoryListItem[];
  activeCategoryId: string;
};
defineProps<Props>();

// define emits
const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (name: 'onCategoryListItemClick', id: string): void;
}>();

// ref
const pcNavigationRef = ref();
// window size
const { width } = useWindowSize();
// 分类列表高度
const categoryListHeight = ref(0);

// 是否展开分类
const isOpenCategory = ref(false);

// 状态切换处理
const triggerIsOpenCategory = () => {
  isOpenCategory.value = !isOpenCategory.value;
};

// 刷新分类列表高度
const refreshCategoryListHeight = () => {
  const categoryElementList = pcNavigationRef.value.querySelector('.category-list') as HTMLDivElement;
  categoryListHeight.value = categoryElementList.getBoundingClientRect().height;
};

// 更新当前下标
const updateCurrentCategoryId = (id: string) => {
  emits('onCategoryListItemClick', id);
};

// watch
watch(width, refreshCategoryListHeight);

// on mounted
onMounted(() => {
  refreshCategoryListHeight();
});
</script>

<template>
  <div
    ref="pcNavigationRef"
    class="pc-navigation bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 overflow-hidden duration-500"
  >
    <div
      class="max-w-[900px] relative text-xs text-zinc-600 duration-300 mx-auto"
      :style="{
        height: isOpenCategory ? `${categoryListHeight}px` : '60px',
      }"
    >
      <!-- 箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerIsOpenCategory"
      >
        <SVGIcon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
      </div>
      <!-- 菜单列表 -->
      <div class="category-list flex flex-wrap justify-center px-[50px] py-1">
        <div
          v-for="item of categoryList"
          :key="item.id"
          :class="[
            'px-1.5',
            'z-10',
            'duration-200',
            'text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300',
            'text-base',
            'font-bold',
            'h-4',
            'leading-4',
            'cursor-pointer',
            'hover:bg-zinc-200 dark:hover:bg-zinc-900',
            'rounded',
            'mr-1',
            'mb-1',
            item.id === activeCategoryId && 'bg-zinc-200 dark:bg-zinc-900',
          ]"
          @click="updateCurrentCategoryId(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PCNavigation.scss'; ;
</style>
