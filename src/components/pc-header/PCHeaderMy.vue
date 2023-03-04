<script setup lang="ts">
import Popover from '@/components/popover/Popover.vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { useAccountStore } from '@/store/resources/account';
import { chechRouteNeedAuth } from '@/utils/router';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '../button/Button.vue';
import { showConfirmModal } from '../confirm-modal';
import { showMessageTooltip } from '../message-tooltip';

// route
const route = useRoute();
// router
const router = useRouter();
// account store
const accountStore = useAccountStore();
// userInfo
const userInfo = computed(() => accountStore.userInfo);
// 菜单
const menuList = [
  {
    id: 'profile',
    title: '个人资料',
    icon: 'profile',
    path: '/Profile',
  },
  {
    id: 'vipProfile',
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/membership',
  },
  {
    id: 'logout',
    title: '退出登录',
    icon: 'logout',
  },
];

// 菜单点击
const handleMenuClick = async (item: typeof menuList[0]) => {
  console.log(item);

  // 个人资料
  if (item.id === 'profile') {
    router.push({
      name: 'UserProfile',
    });
    return;
  }

  // 退出登录
  if (item.id === 'logout') {
    await showConfirmModal({
      content: '确认退出登录吗？',
      onConfirm: () => {
        // 退出登录
        accountStore.signOut();
        // 检测路由是否需要登录，如果需要跳转到登录页面
        chechRouteNeedAuth({
          route,
          showNeedAuthTooltip: false,
        });
        // 提示用户退出成功
        showMessageTooltip({
          type: 'success',
          content: '退出成功...',
          duration: 3000,
        });
      },
    });
    return;
  }

  showMessageTooltip({
    type: 'warn',
    content: '此功能尚未完善...',
    duration: 3000,
  });
};

// 前往登录
const toSignIn = () => {
  router.push({
    name: 'AccountSignIn',
  });
};
</script>

<template>
  <div class="pc-header-my guide-my">
    <!-- 已登录显示 -->
    <Popover placement="bottomRight" class="my-popover" v-if="userInfo">
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none dark:bg-zinc-900 hover:bg-zinc-100/60 dark:hover:bg-zinc-700"
      >
        <!-- 头像 -->
        <img v-imageLazyLoad src="@/assets/images/logo.jpg" class="w-3 h-3 rounded-sm" />
        <!-- 下箭头 -->
        <SVGIcon
          class="w-1.5 h-1.5 ml-0.5 duration-200"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <!-- vip -->
        <SVGIcon
          class="w-1.5 h-1.5 absolute right-[19px] bottom-0"
          name="vip"
          fillClass="fill-zinc-900"
        />
      </div>
      <!-- 气泡视图展示的内容 -->
      <template #content>
        <div class="w-[140px] overflow-hidden">
          <div
            v-for="item of menuList"
            :key="item.id"
            class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
            @click="handleMenuClick(item)"
          >
            <SVGIcon
              :name="item.icon"
              class="w-1.5 h-1.5 mr-1 flex-none"
              fillClass="fill-zinc-900 dark:fill-zinc-300"
            />
            <span class="text-sm text-zinc-800 dark:text-zinc-300">{{ item.title }}</span>
          </div>
        </div>
      </template>
    </Popover>
    <!-- 未登录显示 -->
    <div v-else>
      <Button iconName="profile" iconColor="#fff" @click="toSignIn"></Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeaderMy.scss';
</style>
