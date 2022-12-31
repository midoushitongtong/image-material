<script setup lang="ts">
import MobileNavigation from '@/components/mobile-navigation/MobileNavigation.vue';
import ImageMaterialList from '@/components/image-material-list/ImageMaterialList.vue';
</script>

<template>
  <div class="mobile-home-content">
    <div class="overflow-auto h-full bg-white dark:bg-zinc-800 duration-500">
      <!-- navigation -->
      <MobileNavigation />

      <div class="relative m-[10px]">
        <!-- image material list -->
        <ImageMaterialList
          :waterfallOptions="{
            columnNumber: 2,
            columnSpacing: 10,
            rowSpacing: 10,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MobileHomeContent.scss';
</style>
