<script setup lang="ts">
import { useAccountStore } from '@/store/resources/account';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MobileMenuItem from './MobileMenuItem.vue';

// account store
const accountStore = useAccountStore();
// user info
const userInfo = computed(() => accountStore.userInfo);
// route
const route = useRoute();
// router
const router = useRouter();

// handle vip click
const handleVIPClick = () => {
  router.push({
    name: 'MembershipPlan',
  });
};

// handle my click
const handleMyClick = () => {
  if (userInfo.value) {
    router.push({
      name: 'UserProfile',
    });
  } else {
    router.push({
      name: 'AccountSignIn',
    });
  }
};
</script>

<template>
  <div
    class="mobile-menu absolute top-[85%] left-[50%] translate-x-[-50%] w-[max-content] bg-white dark:bg-zinc-800 rounded-full shadow flex items-center justify-center py-1 px-1.5 z-10"
  >
    <!-- home -->
    <MobileMenuItem
      icon="home"
      :iconClass="
        route.name === 'Home' ? 'fill-zinc-900 dark:fill-zinc-200' : 'fill-zinc-400 dark:fill-zinc-500'
      "
      text="首页"
      :textClass="
        route.name === 'Home' ? 'text-zinc-900 dark:text-zinc-200' : 'text-zinc-400 dark:text-zinc-500'
      "
      @click="
        () => {
          router.push({
            name: 'Home',
          });
        }
      "
    />

    <!-- vip -->
    <MobileMenuItem
      v-if="userInfo"
      icon="vip"
      iconClass="fill-zinc-400 dark:fill-zinc-500"
      text="VIP"
      textClass="text-zinc-400 dark:text-zinc-500"
      @click="handleVIPClick"
    />

    <!-- 我的 -->
    <MobileMenuItem
      v-if="userInfo"
      icon="profile"
      :iconClass="
        route.name === 'UserProfile'
          ? 'fill-zinc-900 dark:fill-zinc-200'
          : 'fill-zinc-400 dark:fill-zinc-500'
      "
      text="我的"
      :textClass="
        route.name === 'UserProfile'
          ? 'text-zinc-900 dark:text-zinc-200'
          : 'text-zinc-400 dark:text-zinc-500'
      "
      @click="handleMyClick"
    />
    <!-- 去登录 -->
    <MobileMenuItem
      v-else
      icon="profile"
      :iconClass="
        route.name === 'AccountSignIn'
          ? 'fill-zinc-900 dark:fill-zinc-200'
          : 'fill-zinc-400 dark:fill-zinc-500'
      "
      text="去登录"
      :textClass="
        route.name === 'AccountSignIn'
          ? 'text-zinc-900 dark:text-zinc-200'
          : 'text-zinc-400 dark:text-zinc-500'
      "
      @click="handleMyClick"
    />
  </div>
</template>

<style lang="scss">
@import './MobileMenu.scss';
</style>
