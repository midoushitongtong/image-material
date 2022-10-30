<script setup lang="ts">
import { useAppStore } from '@/store/resources/app';
import MobileHome from './MobileHome.vue';
import PCHome from './PCHome.vue';
import { computed, onMounted, ref } from 'vue';
import { getCategoryList } from '@/apis/category';
import type { CategoryListItem } from '@/apis/category/types';
import { ALL_CATEGORY_LIST_ITEM } from '@/constants';

// app store
const appStore = useAppStore();
// device type
const deviceType = computed(() => appStore.deviceType);
// init data loading
const initDataLoading = ref(true);
// category list
const categoryList = ref<CategoryListItem[]>([]);

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
</script>

<template>
  <template v-if="!initDataLoading">
    <PCHome v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'" :categoryList="categoryList" />
    <MobileHome v-if="deviceType === 'MOBILE'" :categoryList="categoryList" />
  </template>
</template>

<style lang="scss" scoped>
@import './Home.scss';
</style>
