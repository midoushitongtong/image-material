<script setup lang="ts">
import { useSearchHistoryStore } from '@/store/resources/search-history';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { computed } from 'vue';

// define emits
const emits = defineEmits(['itemClick']);

// search histor store
const searchHistoryStore = useSearchHistoryStore();
// search history list
const searchHistoryList = computed(() => searchHistoryStore.searchHistoryList);

// handle delete all item
const handleDeleteAllItem = () => {
  searchHistoryStore.deleteAllSearchHistory();
};

// handle delete item
const handleDeleteItem = (item: string) => {
  searchHistoryStore.deleteSearchHistory(item);
};

// handle item click
const handleItemClick = (item: string) => {
  emits('itemClick', item);
};
</script>

<template>
  <div class="pc-header-search-history">
    <div class="flex items-center text-xs text-zinc-400">
      <span>最新搜索</span>
      <SVGIcon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="handleDeleteAllItem"
      />
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="(item, index) of searchHistoryList"
        :key="index"
        class="mr-1 mt-1 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
        @click="handleItemClick(item)"
      >
        <span>{{ item }}</span>
        <SVGIcon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="handleDeleteItem(item)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeaderSearchHistory.scss';
</style>
