<script setup lang="ts">
import PCHeader from '@/components/pc-header/PCHeader.vue';
import PCHomeContent from './PCHomeContent.vue';
import PCHomeFloatingMenu from './PCHomeFloatingMenu.vue';
</script>

<template>
  <!-- header -->
  <PCHeader />
  <!-- content -->
  <PCHomeContent />
  <!-- floating menu -->
  <PCHomeFloatingMenu />
</template>

<style lang="scss" scoped>
@import './PCHome.scss';
</style>
