<script setup lang="ts">
import Popover from '@/components/popover/Popover.vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';

// 菜单
const menuList = [
  {
    id: '1',
    title: '个人资料',
    icon: 'profile',
    path: '/Profile',
  },
  {
    id: '2',
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/membership',
  },
  {
    id: '3',
    title: '退出登录',
    icon: 'logout',
  },
];
</script>

<template>
  <div class="pc-header-my">
    <Popover placement="bottomRight" class="my-popover">
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
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeaderMy.scss';
</style>
