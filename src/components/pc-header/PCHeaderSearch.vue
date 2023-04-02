<script setup lang="ts">
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import Button from '@/components/button/Button.vue';
import { computed, nextTick, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import PCHeaderSearchHint from './PCHeaderSearchHint.vue';
import PCHeaderSearchHistory from './PCHeaderSearchHistory.vue';
import PCHeaderSearchHotCategory from './PCHeaderSearchHotCategory.vue';
import { useSearchHistoryStore } from '@/store/resources/search-history';
import type { SearchHintListItem } from '@/apis/search/types';

type Props = {
  searchKeyword: string;
};

// define props
const props = defineProps<Props>();

// define emits
const emits = defineEmits<{
  (_name: 'update:searchKeyword', _keyword: string): void;
  (_name: 'onSubmitSearch'): void;
}>();

// search hint list
const searchHintList = ref<SearchHintListItem[]>([]);
// search histor store
const searchHistoryStore = useSearchHistoryStore();
// container ref
const containerRef = ref();
// 是否显示 dropdown
const visibleDropdown = ref(false);
// 是否显示 hint
const visibleSearchHint = ref(false);
// 是否显示 hint (searchHintList 长度大于 0 才显示)
const formatVisibleSearchHint = computed(() => {
  return visibleSearchHint.value && searchHintList.value.length > 0;
});
// 点击 container 之外的区域关闭 dropdown
onClickOutside(containerRef, () => {
  visibleDropdown.value = false;
});

// handle input
const handleInputValue = (e: Event) => {
  // @ts-ignore
  const value = e.target?.value;
  emits('update:searchKeyword', value);
  visibleDropdown.value = true;
};

// handle focus and click input
const handleFocusAndClickInput = () => {
  visibleDropdown.value = true;
  visibleSearchHint.value = !!props.searchKeyword;
};

// handle clear
const handleClearValue = () => {
  emits('update:searchKeyword', '');
};

// handle submit search
const handleSubmitSearch = () => {
  if (props.searchKeyword) {
    searchHistoryStore.addSearchHistory(props.searchKeyword);
  }
  visibleDropdown.value = false;
  // 等待 dropdown 隐藏动画执行完成
  setTimeout(() => {
    emits('onSubmitSearch');
  }, 300);
};

// handle search hint list item click
const handleSearchHintListItemClick = (item: string) => {
  emits('update:searchKeyword', item);
  nextTick(() => {
    // 加 nextTick 等 update:searchKeyword 执行完成
    handleSubmitSearch();
  });
};

// handle search history item click
const handleSearchHistoryItemClick = (item: string) => {
  emits('update:searchKeyword', item);
  nextTick(() => {
    // 加 nextTick 等 update:searchKeyword 执行完成
    handleSubmitSearch();
    // 加 nextTick 是因为要等 watch 的逻辑先执行
    visibleSearchHint.value = false;
  });
};

// 监听 serchKeyword 更新 visibleSearchHint
watch(
  () => props.searchKeyword,
  (newValue) => {
    visibleSearchHint.value = !!newValue;
  }
);
</script>

<template>
  <div class="pc-header-search p-0.5 relative mr-1 flex-1" ref="containerRef">
    <div class="group relative guide-search rounded-xl border-white duration-500 hover:bg-red-100/40">
      <!-- 搜索图标 -->
      <SVGIcon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute top-[50%] left-[15px] translate-y-[-50%]"
      />
      <!-- 输入框 -->
      <input
        type="text"
        class="group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 block w-full h-[44px] pl-4 pr-[85px] outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tranking-wide text-sm font-semibold border border-solid border-zinc-100 dark:border-zinc-700 focus:border-red-300 duration-500"
        placeholder="搜索"
        :value="searchKeyword"
        @input="handleInputValue"
        @keyup.enter="handleSubmitSearch"
        @focus="handleFocusAndClickInput"
        @click="handleFocusAndClickInput"
      />
      <!-- 删除按钮 -->
      <SVGIcon
        v-show="searchKeyword"
        name="input-delete"
        color="#707070"
        class="w-1.5 h-1.5 absolute top-[50%] right-[58px] translate-y-[-50%] duration-500 cursor-pointer"
        @click="handleClearValue"
      />
      <!-- 分割线 -->
      <div
        class="group-hover:opacity-100 opacity-0 w-[1px] h-1.5 absolute top-[50%] translate-y-[-50%] right-[50px] duration-500 bg-zinc-200"
      />
      <!-- 搜索按钮 -->
      <Button
        iconName="search"
        iconColor="#fff"
        class="group-hover:opacity-100 opacity-100 absolute top-[50%] translate-y-[-50%] right-[2px] rounded-full duration-500"
        @click="handleSubmitSearch"
      />
    </div>

    <!-- 下拉区域 -->
    <transition name="slide">
      <div
        v-show="visibleDropdown"
        class="scrollbar max-h-[368px] z-20 overflow-y-auto text-sm bg-white dark:bg-zinc-800 absolute top-[57px] left-0.5 right-0.5 p-2 rounded border border-solid border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-lg"
      >
        <!-- 搜索关键字提示 -->
        <PCHeaderSearchHint
          v-show="formatVisibleSearchHint"
          v-model:searchHintList="searchHintList"
          :searchKeyword="searchKeyword"
          @itemClick="handleSearchHintListItemClick"
        />
        <!-- 最近搜索 -->
        <PCHeaderSearchHistory
          v-show="!formatVisibleSearchHint"
          @itemClick="handleSearchHistoryItemClick"
        />
        <!-- 热门主题 -->
        <PCHeaderSearchHotCategory />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeaderSearch.scss';
</style>
