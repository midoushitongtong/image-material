<script setup lang="ts">
import type { CategoryListItem } from '@/apis/category/types';
import type { PropType } from 'vue';

// define props
const props = defineProps({
  categoryList: {
    type: Array as PropType<CategoryListItem[]>,
    required: true,
  },
  currentCategoryIndex: {
    type: Number,
    required: true,
  },
});

// define emits
const emits = defineEmits(['onCategoryListItemClick']);
</script>

<template>
  <div class="pt-2 h-[80vh] flex flex-col">
    <h2 class="text-base text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">所有分类</h2>
    <div class="overflow-y-auto pb-2">
      <div
        v-for="(item, index) of props.categoryList"
        :key="item.id"
        :class="[
          'text-sm',
          'text-zinc-600',
          'dark:text-zinc-300',
          'px-1',
          'py-1.5',
          'duration-100',
          'active:text-zinc-100',
          'active:bg-zinc-900',
          currentCategoryIndex === index && 'font-bold text-zinc-100 bg-zinc-900',
        ]"
        @click="emits('onCategoryListItemClick', index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MobileNavigationCategoryMenu.scss';
</style>
