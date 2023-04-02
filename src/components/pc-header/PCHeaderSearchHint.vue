<script setup lang="ts">
import { getSearchHintList } from '@/apis/search';
import type { SearchHintListItem } from '@/apis/search/types';
import { watchThrottled } from '@vueuse/core';
import { showMessageTooltip } from '../message-tooltip';

type Props = {
  searchKeyword: string;
  searchHintList: SearchHintListItem[];
};

// define props
const props = defineProps<Props>();

// define emits
const emits = defineEmits<{
  (_name: 'itemClick', _keyword: string): void;
  (_name: 'update:searchHintList', _searchHintList: SearchHintListItem[]): void;
}>();

// 刷新搜索提示
const refreshData = async () => {
  if (!props.searchKeyword) {
    emits('update:searchHintList', []);
    return;
  }
  try {
    const result = await getSearchHintList({
      searchKeyword: props.searchKeyword,
    });
    emits('update:searchHintList', result.data);
  } catch (error) {
    console.log(error);

    showMessageTooltip({
      type: 'warn',
      content: '服务器内部错误, 请稍后重试...',
      duration: 3000,
    });
  }
};

// handle item click
const handleItemClick = (item: string) => {
  emits('itemClick', item);
};

// 处理关键字高亮
const formatKeyword = (keyword: string) => {
  // 高亮标签
  const higlightElement = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchKeyword}</span>`;
  // 匹配 "用户输入的内容" 的正则表达式
  const higlightReg = new RegExp(props.searchKeyword, 'gi');
  // 将 "用户输入的内容" 替换成 "高亮标签"
  return keyword.replace(higlightReg, higlightElement);
};

// 监听搜索关键字，刷新搜索提示
watchThrottled(
  () => props.searchKeyword,
  () => {
    refreshData();
  },
  {
    immediate: true,
    // 每次出发时，延迟的时间
    throttle: 300,
  }
);
</script>

<template>
  <div class="pc-header-search-hint">
    <div
      v-for="(item, index) of searchHintList"
      :key="index"
      class="p-1 text-sm font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="handleItemClick(item.keyword)"
      v-html="formatKeyword(item.keyword)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeaderSearchHint.scss';
</style>
