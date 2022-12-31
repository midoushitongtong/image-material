<script setup lang="ts">
import { useRouter } from 'vue-router';
import PCHeaderSearch from './PCHeaderSearch.vue';
import PCHeaderTheme from './PCHeaderTheme.vue';
import PCHeaderMy from './PCHeaderMy.vue';
import { ref } from 'vue';

// router
const router = useRouter();
// search keyword
const searchKeyword = ref('');

// to home
const toHome = () => {
  router.push({
    name: 'Home',
  });
};

// handle submit search
const handleSubmitSearch = () => {
  console.log('处理提交搜索', searchKeyword.value);
};
</script>

<template>
  <div class="pc-header">
    <div
      class="w-full bg-white dark:bg-zinc-800 border-b border-solid border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500"
    >
      <div class="flex items-center">
        <!-- logo -->
        <img
          v-imageLazyLoad
          src="@/assets/images/logo.jpg"
          class="rounded-sm w-auto h-4 cursor-pointer mr-2"
          @click="toHome"
        />
        <!-- search -->
        <PCHeaderSearch v-model:searchKeyword="searchKeyword" @onSubmitSearch="handleSubmitSearch" />
        <!-- theme -->
        <PCHeaderTheme />
        <!-- my -->
        <PCHeaderMy />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeader.scss';
</style>
