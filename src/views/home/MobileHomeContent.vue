<script setup lang="ts">
import MobileImageMaterialCategoryNavigation from '@/components/mobile-image-material-category-navigation/MobileImageMaterialCategoryNavigation.vue';
import ImageMaterialList, {
  type ImageMaterialSearchParams,
} from '@/components/image-material-list/ImageMaterialList.vue';
import { inject, type Ref } from 'vue';
import type { ImageMaterialCategoryListItem } from '@/apis/image-material-category/types';

// inject
const imageMaterialCategoryList = inject('imageMaterialCategoryList') as Ref<
  ImageMaterialCategoryListItem[]
>;
const imageMaterialSearchParams = inject('imageMaterialSearchParams') as Ref<ImageMaterialSearchParams>;

// handle category list item click
const handleCategoryListItemClick = (id: string) => {
  imageMaterialSearchParams.value = {
    ...imageMaterialSearchParams.value,
    categoryId: id,
  };
};
</script>

<template>
  <div class="mobile-home-content">
    <div class="overflow-auto h-full bg-white dark:bg-zinc-800 duration-500">
      <!-- navigation -->
      <MobileImageMaterialCategoryNavigation
        :imageMaterialCategoryList="imageMaterialCategoryList"
        :activeCategoryId="imageMaterialSearchParams.categoryId"
        @onCategoryListItemClick="handleCategoryListItemClick"
      />

      <div class="relative m-[10px]">
        <!-- image material list -->
        <ImageMaterialList
          :waterfallOptions="{
            columnNumber: 2,
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
@import './MobileHomeContent.scss';
</style>
