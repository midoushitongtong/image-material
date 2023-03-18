<script setup lang="ts">
import type { MembershipPlanListItem } from '@/apis/membership-plan/types';

// define props
type Props = {
  item: MembershipPlanListItem;
  active: boolean;
};
defineProps<Props>();

// define emits
const emits = defineEmits<{
  (_name: 'onClick'): void;
}>();

// handle click
const handleClick = () => {
  emits('onClick');
};
</script>

<template>
  <div
    :class="[
      'membership-plan-list-item last:mr-0 mt-[12px] relative flex-none w-[150px] flex flex-col items-center mr-[20px] p-2 border border-solid border-zinc-300 rounded-md duration-300 hover:bg-orange-50 hover:border-orange-500 cursor-pointer bg-white dark:bg-orange-50/10',
      active && ' bg-orange-50 border-orange-500 ',
    ]"
    @click="handleClick"
  >
    <!-- title -->
    <div class="text-base text-yellow-800 dark:text-orange-300">
      {{ item.title }}
    </div>
    <!-- price -->
    <div class="mt-1 text-2xl tracking-tighter font-bold text-yellow-800 dark:text-orange-300">
      <span class="text-base">￥</span>
      <span>{{ item.price }}</span>
    </div>
    <!-- old price -->
    <div class="mt-[2px] text-[14px] text-yellow-500 line-through">
      <span>￥</span>
      <span>{{ item.oldPrice }}</span>
    </div>
    <!-- 热销 -->
    <div
      v-if="item.isHot"
      class="absolute right-[-1px] top-[-12px] px-[10px] leading-[22px] text-center text-yellow-700 bg-gradient-to-r from-orange-300 to-orange-100 text-[12px] rounded-tr-[10px] rounded-bl-[10px]"
    >
      热销
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MembershipPlanListItem.scss';
</style>
