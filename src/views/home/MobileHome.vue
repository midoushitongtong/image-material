<script setup lang="ts">
import type { CategoryListItem } from '@/apis/category/types';
import MobileHomeContent from './MobileHomeContent.vue';
import type { PropType } from 'vue';

// define props
const props = defineProps({
  categoryList: {
    type: Array as PropType<CategoryListItem[]>,
    required: true,
  },
});
</script>

<template>
  <!-- content -->
  <MobileHomeContent :categoryList="props.categoryList" />
</template>

<style lang="scss" scoped>
@import './MobileHome.scss';
</style>
