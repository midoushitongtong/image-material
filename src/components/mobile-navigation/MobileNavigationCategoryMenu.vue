<script setup lang="ts">
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
</script>

<template>
  <div class="mobile-navigation-category-menu pt-2 h-[80vh] flex flex-col">
    <h2 class="text-base text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">所有分类</h2>
    <div class="overflow-y-auto pb-2">
      <div
        v-for="item of categoryList"
        :key="item.id"
        :class="[
          'text-sm',
          'text-zinc-600 dark:text-zinc-300',
          'px-1',
          'py-1.5',
          'duration-100',
          'active:text-zinc-100',
          'active:bg-zinc-900',
          item.id === activeCategoryId && 'font-bold text-zinc-100 bg-zinc-900 dark:bg-zinc-800',
        ]"
        @click="emits('onCategoryListItemClick', item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MobileNavigationCategoryMenu.scss';
</style>
