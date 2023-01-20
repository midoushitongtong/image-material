<script setup lang="ts">
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { useAppStore } from '@/store/resources/app';
import MobileHome from './MobileHome.vue';
import PCHome from './PCHome.vue';
import { computed, onMounted, provide, ref } from 'vue';
import { getCategoryList } from '@/apis/category';
import { ALL_CATEGORY_LIST_ITEM } from '@/constants';
import type { CategoryListItem } from '@/apis/category/types';
import type { ImageMaterialSearchParams } from '@/components/image-material-list/ImageMaterialList.vue';

// app store
const appStore = useAppStore();
// device type
const deviceType = computed(() => appStore.deviceType);
// init data loading
const initDataLoading = ref(true);
// categoty list
const categoryList = ref<CategoryListItem[]>([]);
// image material search params
const imageMaterialSearchParams = ref<ImageMaterialSearchParams>({
  categoryId: 'all',
  keyword: undefined,
});

// init data
const initData = async () => {
  try {
    initDataLoading.value = true;

    const result = await getCategoryList();
    categoryList.value = [ALL_CATEGORY_LIST_ITEM, ...result.data];

    initDataLoading.value = false;
  } catch (error) {
    console.log(error);
  }
};

// on mounted
onMounted(() => {
  initData();
});

// provide
provide('categoryList', categoryList);
provide('imageMaterialSearchParams', imageMaterialSearchParams);
</script>

<template>
  <template v-if="!initDataLoading">
    <PCHome v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'" />
    <MobileHome v-if="deviceType === 'MOBILE'" />
  </template>
  <!-- loading -->
  <div v-else class="p-2">
    <SVGIcon class="w-4 h-4 mx-auto animate-spin" name="infinite-load" />
  </div>
</template>

<style lang="scss" scoped>
@import './Home.scss';
</style>
