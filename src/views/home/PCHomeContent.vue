<script setup lang="ts">
import PCImageMaterialCategoryNavigation from '@/components/pc-image-material-category-navigation/PCImageMaterialCategoryNavigation.vue';
import ImageMaterialList, {
  type ImageMaterialSearchParams,
} from '@/components/image-material-list/ImageMaterialList.vue';
import { computed, inject, type Ref } from 'vue';
import type { ImageMaterialCategoryListItem } from '@/apis/image-material-category/types';
import { useAppStore } from '@/store/resources/app';

// inject
const imageMaterialCategoryList = inject('imageMaterialCategoryList') as Ref<
  ImageMaterialCategoryListItem[]
>;
const imageMaterialSearchParams = inject('imageMaterialSearchParams') as Ref<ImageMaterialSearchParams>;

// app store
const appStore = useAppStore();
// device type
const deviceType = computed(() => appStore.deviceType);

// handle category list item click
const handleCategoryListItemClick = (id: string) => {
  imageMaterialSearchParams.value = {
    ...imageMaterialSearchParams.value,
    categoryId: id,
  };
};
</script>

<template>
  <div class="pc-home-content">
    <div class="scrollbar overflow-auto h-full bg-white dark:bg-zinc-800 duration-500">
      <!-- navigation -->
      <PCImageMaterialCategoryNavigation
        :imageMaterialCategoryList="imageMaterialCategoryList"
        :activeCategoryId="imageMaterialSearchParams.categoryId"
        @onCategoryListItemClick="handleCategoryListItemClick"
      />

      <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-2 px-[20px]">
        <!-- image material list -->
        <ImageMaterialList
          :waterfallOptions="{
            columnNumber: deviceType === 'DESKTOP' ? 5 : 3,
            columnSpacing: 10,
            rowSpacing: 10,
          }"
          :imageMaterialSearchParams="imageMaterialSearchParams"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHomeContent.scss';
</style>
