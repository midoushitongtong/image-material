<script setup lang="ts">
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { getImageMaterialList } from '@/apis/imater-material';
import type { ImageMaterialListItem } from '@/apis/imater-material/types';
import { computed, onMounted, ref, watch, type PropType } from 'vue';
import Waterfall from '@/components/waterfall/Waterfall.vue';
import ImageMaterialListItem_ from './ImageMaterialListItem.vue';
import InfiniteScroll from '@/components/infinite-scroll/InfiniteScroll.vue';
import { useViewStore } from '@/store/resources/view';

// define props
defineProps({
  waterfallOptions: {
    type: Object as PropType<object>,
    requred: false,
    default: () => {},
  },
});

// view store
const viewStore = useViewStore();
// image material search params
const imageMaterialSearchParams = computed(() => viewStore.homeViewData.imageMaterialSearchParams);
// init data loading
const initDataLoading = ref(true);
// pagination
const pagination = ref({
  pageNumber: 1,
  pageSize: 20,
  total: 0,
});
// image material list
const imageMaterialList = ref<ImageMaterialListItem[]>([]);
// load more data loading
const loadMoreDataLoading = ref(false);
// not more data
const notMoreData = ref(false);

// load data
const loadData = async () => {
  // 暂无更多数据
  if (notMoreData.value) {
    return;
  }

  try {
    console.log(`加载第 ${pagination.value.pageNumber} 页数据`);

    const result = await getImageMaterialList({
      pageNumber: pagination.value.pageNumber,
      pageSize: pagination.value.pageSize,
      categoryId: imageMaterialSearchParams.value.categoryId,
    });
    if (pagination.value.pageNumber === 1) {
      // 首次加载，直接覆盖
      imageMaterialList.value = result.data;
    } else {
      // 分页加载，累积数据
      imageMaterialList.value = [...imageMaterialList.value, ...result.data];
    }
    // 暂无更多数据
    if (pagination.value.pageNumber * pagination.value.pageSize >= result.total) {
      notMoreData.value = true;
    }
    // 页码加一
    pagination.value.pageNumber += 1;
    // 更新 total
    pagination.value.total = result.total;
  } catch (error) {
    console.log(error);
  }
};

// init data
const initData = async () => {
  initDataLoading.value = true;
  pagination.value.pageNumber = 1;
  await loadData();
  initDataLoading.value = false;
};

// load more data
const loadMoreData = async () => {
  if (initDataLoading.value) {
    return;
  }

  loadMoreDataLoading.value = true;
  await new Promise((r) => setTimeout(r, 1000));
  await loadData();
  loadMoreDataLoading.value = false;
};

// 搜索参数发生变化，刷新数据
watch(imageMaterialSearchParams, () => {
  initData();
});

// on mounted
onMounted(() => {
  initData();
});
</script>

<template>
  <div class="image-material-list" v-if="!initDataLoading">
    <InfiniteScroll :loading="loadMoreDataLoading" :isFinished="notMoreData" @onLoad="loadMoreData">
      <Waterfall
        :dataSource="imageMaterialList"
        itemKey="id"
        :columnNumber="5"
        :imagePreReading="false"
        v-bind="waterfallOptions"
      >
        <template #item="{ item, width }">
          <ImageMaterialListItem_ :imageMaterialListItem="item" :containerWidth="width" />
        </template>
      </Waterfall>
    </InfiniteScroll>
  </div>
  <!-- loading -->
  <div v-else class="p-2">
    <SVGIcon class="w-4 h-4 mx-auto animate-spin" name="infinite-load" />
  </div>
</template>

<style lang="scss" scoped>
@import './ImageMaterialList.scss';
</style>
