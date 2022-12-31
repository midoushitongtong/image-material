import type { CategoryListItem } from '@/apis/category/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useViewStore = defineStore('view', () => {
  // ==================================================
  // state
  // ==================================================
  // home
  const homeViewData = ref<{
    categoryList: CategoryListItem[];
    imageMaterialSearchParams: {
      categoryId: string;
    };
  }>({
    categoryList: [],
    imageMaterialSearchParams: {
      categoryId: 'all',
    },
  });

  // ==================================================
  // actions
  // ==================================================
  const updateHomeViewData = (homeViewData_: typeof homeViewData.value) => {
    homeViewData.value = homeViewData_;
  };

  return {
    homeViewData,
    updateHomeViewData,
  };
});

export { useViewStore };
