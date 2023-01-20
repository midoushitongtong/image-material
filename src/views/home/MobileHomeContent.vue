<script setup lang="ts">
import MobileNavigation from '@/components/mobile-navigation/MobileNavigation.vue';
import ImageMaterialList, {
  type ImageMaterialSearchParams,
} from '@/components/image-material-list/ImageMaterialList.vue';
import { inject, type Ref } from 'vue';
import type { CategoryListItem } from '@/apis/category/types';

// inject
const categoryList = inject('categoryList') as Ref<CategoryListItem[]>;
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
      <MobileNavigation
        :categoryList="categoryList"
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
