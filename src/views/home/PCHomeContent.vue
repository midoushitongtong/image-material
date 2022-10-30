<script setup lang="ts">
import type { CategoryListItem } from '@/apis/category/types';
import PCNavigationVue from '@/components/pc-navigation/PCNavigation.vue';
import type { PropType } from 'vue';

// define props
defineProps({
  categoryList: {
    type: Array as PropType<CategoryListItem[]>,
    required: true,
  },
});
</script>

<template>
  <div class="pc-content">
    <!-- navigation -->
    <PCNavigationVue :categoryList="categoryList" />
  </div>
</template>

<style lang="scss" scoped>
@import './PCHomeContent.scss';
</style>
