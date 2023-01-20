<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getHotCategoryList } from '@/apis/category';
import type { HotCategoryListItem } from '@/apis/category/types';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { randomColor } from '@/utils/random';

// init data loading
const initDataLoading = ref(true);
// hot category list
const hotCategory = ref<{
  big?: HotCategoryListItem;
  list: HotCategoryListItem[];
}>({
  big: undefined,
  list: [],
});

// 刷新搜索提示
const initData = async () => {
  try {
    initDataLoading.value = true;
    const result = await getHotCategoryList();
    hotCategory.value = {
      big: result.data[0],
      list: result.data.slice(1),
    };
  } catch (error) {
    console.log(error);
  } finally {
    initDataLoading.value = false;
  }
};

// on mounted
onMounted(() => {
  initData();
});
</script>

<template>
  <template v-if="!initDataLoading">
    <div class="pc-header-search-hot-category">
      <div class="text-xs mb-1 text-zinc-400">热门精选</div>
      <div v-if="hotCategory.big?.photo && hotCategory.list.length > 0" class="flex h-[140px]">
        <!-- 大图 -->
        <div
          class="group relative rounded w-[260px] flex-none cursor-pointer"
          :style="{
            backgroundColor: randomColor(),
          }"
        >
          <img v-imageLazyLoad class="h-full w-full object-cover rounded" :src="hotCategory.big.photo" />
          <p
            class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur-sm rounded px-1 text-white text-xs duration-300 group-hover:backdrop-blur-none"
          >
            # {{ hotCategory.big.title }}
          </p>
        </div>
        <!-- 小图 -->
        <div class="flex flex-wrap flex-1 pr-1.5">
          <div
            v-for="item of hotCategory.list"
            :key="item.id"
            class="group h-[45%] w-[100%] max-w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded cursor-pointer"
          >
            <img v-imageLazyLoad class="h-full w-full object-cover rounded" :src="item.photo" />
            <p
              class="absolute top-0 left-0 w-full h-full flex items-center backdrop-blur-sm rounded px-1 text-white text-xs duration-300 group-hover:backdrop-blur-none"
            >
              # {{ item.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  <!-- loading -->
  <div v-else class="p-2">
    <SVGIcon class="w-3 h-3 mx-auto animate-spin" name="infinite-load" />
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeaderSearchHotCategory.scss';
</style>
