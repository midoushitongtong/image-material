<script setup lang="ts">
import { useRouter } from 'vue-router';
import PCHeaderSearch from './PCHeaderSearch.vue';
import PCHeaderTheme from './PCHeaderTheme.vue';
import PCHeaderMy from './PCHeaderMy.vue';
import { ref } from 'vue';

type Props = {
  hiddenSearch?: boolean;
};

// define props
defineProps<Props>();

// emits
const emits = defineEmits<{
  (_name: 'onSubmitSearch', _keyword: string): void;
}>();

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
  emits('onSubmitSearch', searchKeyword.value);
};
</script>

<template>
  <div class="pc-header">
    <div
      class="w-full bg-white dark:bg-zinc-800 border-b border-solid border-b-zinc-200 dark:border-b-zinc-700 px-2 mobile:px-1 py-1 duration-500"
    >
      <div class="flex items-center">
        <!-- logo -->
        <img
          v-imageLazyLoad
          src="@/assets/images/logo.jpg"
          class="guide-home rounded-sm w-auto h-4 cursor-pointer mr-2"
          @click="toHome"
        />

        <!-- search -->
        <PCHeaderSearch
          v-if="!hiddenSearch"
          v-model:searchKeyword="searchKeyword"
          @onSubmitSearch="handleSubmitSearch"
        />
        <!-- search 容器占位 -->
        <div v-else class="flex-1 pc-and-tablet:h-[54px]"></div>

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
