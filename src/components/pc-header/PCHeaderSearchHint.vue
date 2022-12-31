<script setup lang="ts">
import { ref, watch } from 'vue';
import { getSearchHintList } from '@/apis/search';
import type { SearchHintListItem } from '@/apis/search/types';

// define props
const props = defineProps({
  searchKeyword: {
    type: String,
    required: true,
  },
});

// define emits
const emits = defineEmits(['itemClick']);

// search hint list
const serachHintList = ref<SearchHintListItem[]>([]);

// 刷新搜索提示
const refreshData = async () => {
  if (!props.searchKeyword) {
    return;
  }
  try {
    const result = await getSearchHintList({
      searchKeyword: props.searchKeyword,
    });
    serachHintList.value = result.data;
  } catch (error) {
    console.log(error);
  }
};

// handle item click
const handleItemClick = (item: string) => {
  emits('itemClick', item);
};

// 监听搜索关键字，筛选搜索提示
watch(
  () => props.searchKeyword,
  () => {
    refreshData();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="pc-header-search-hint">
    <div
      v-for="(item, index) of serachHintList"
      :key="index"
      class="p-1 text-sm font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="handleItemClick(item.keyword)"
    >
      {{ item.keyword }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeaderSearchHint.scss';
</style>
