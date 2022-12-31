<script setup lang="ts">
import PCNavigation from '@/components/pc-navigation/PCNavigation.vue';
import ImageMaterialList from '@/components/image-material-list/ImageMaterialList.vue';
</script>

<template>
  <div class="pc-home-content">
    <div class="overflow-auto h-full bg-white dark:bg-zinc-800 duration-500">
      <!-- navigation -->
      <PCNavigation />

      <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-2 px-[20px]">
        <!-- image material list -->
        <ImageMaterialList
          :waterfallOptions="{
            columnNumber: 5,
            columnSpacing: 10,
            rowSpacing: 10,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHomeContent.scss';
</style>
