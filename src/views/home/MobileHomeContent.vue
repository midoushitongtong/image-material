<script setup lang="ts">
import type { CategoryListItem } from '@/apis/category/types';
import MobileNavigation from '@/components/mobile-navigation/MobileNavigation.vue';
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
  <div class="mobile-content">
    <!-- navigation -->
    <MobileNavigation :categoryList="props.categoryList" />
  </div>
</template>

<style lang="scss" scoped>
@import './MobileHomeContent.scss';
</style>
