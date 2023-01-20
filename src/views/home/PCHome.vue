<script setup lang="ts">
import type { ImageMaterialSearchParams } from '@/components/image-material-list/ImageMaterialList.vue';
import PCHeader from '@/components/pc-header/PCHeader.vue';
import { inject, type Ref } from 'vue';
import PCHomeContent from './PCHomeContent.vue';
import PCHomeFloatingMenu from './PCHomeFloatingMenu.vue';

// inject
const imageMaterialSearchParams = inject('imageMaterialSearchParams') as Ref<ImageMaterialSearchParams>;

// handle submit search
const handleSubmitSearch = (keyword?: string) => {
  imageMaterialSearchParams.value = {
    ...imageMaterialSearchParams.value,
    keyword,
  };
};
</script>

<template>
  <!-- header -->
  <PCHeader @onSubmitSearch="handleSubmitSearch" />
  <!-- content -->
  <PCHomeContent />
  <!-- floating menu -->
  <PCHomeFloatingMenu />
</template>

<style lang="scss" scoped>
@import './PCHome.scss';
</style>
