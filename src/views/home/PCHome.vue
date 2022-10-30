<script setup lang="ts">
import type { CategoryListItem } from '@/apis/category/types';
import PCHeader from '@/components/pc-header/PCHeader.vue';
import type { PropType } from 'vue';
import PCHomeContent from './PCHomeContent.vue';
import PCHomeFloatingMenu from './PCHomeFloatingMenu.vue';

// define props
defineProps({
  categoryList: {
    type: Array as PropType<CategoryListItem[]>,
    required: true,
  },
});
</script>

<template>
  <!-- header -->
  <PCHeader :categoryList="categoryList" />
  <!-- content -->
  <PCHomeContent :categoryList="categoryList" />
  <!-- floating menu -->
  <PCHomeFloatingMenu />
</template>

<style lang="scss" scoped>
@import './PCHome.scss';
</style>
