<script setup lang="ts">
import type { MembershipPlanListItem } from '@/apis/membership-plan/types';
import Button from '@/components/button/Button.vue';
import CountDown from '@/components/count-down/CountDown.vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { useAppStore } from '@/store/resources/app';
import { useElementBounding } from '@vueuse/core';
import dayjs from 'dayjs';
import { computed, ref, watch } from 'vue';

// define props
type Props = {
  currentMembershiPlanListItem: MembershipPlanListItem;
};
defineProps<Props>();

// ref
const mobileContentContainer = ref();
// app store
const appStore = useAppStore();
// device type
const deviceType = computed(() => appStore.deviceType);
// 手机端内容容器边界信息
const { height } = useElementBounding(mobileContentContainer);

// 处理倒计时结束
const handleCountDownFinish = () => {};

// 设置 padding
watch(
  () => height.value,
  (newValue) => {
    const membershipPlanContentContainerElement = document.querySelector(
      '.membership-plan-content-container'
    ) as HTMLDivElement | null;

    if (membershipPlanContentContainerElement) {
      membershipPlanContentContainerElement.style.paddingBottom = `calc(0.375rem + ${newValue}px)`;
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="payment">
    <!-- 电脑端和平板端的 UI -->
    <template v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'">
      <div class="mt-3.5">
        <!-- 倒计时 -->
        <div
          class="flex justify-center p-1 items-center bg-orange-100 border-orange-300 border border-solid rounded-sm"
        >
          <SVGIcon name="countdown" class="w-1.5 h-1.5 mr-1" fillClass="fill-red-600" />
          <!-- 倒计时数字 -->
          <div class="text-[14px] text-red-600 font-bold flex">
            <div class="mr-0.5">限时优惠|距离倒计时结束仅剩</div>
            <CountDown :endTime="dayjs().add(60, 'second')" @onFinish="handleCountDownFinish" />
          </div>
        </div>

        <!-- 金额 -->
        <div
          class="flex flex-col items-center justify-center border-zinc-200 dark:border-zinc-600 border border-solid rounded-sm mt-1 p-2 pb-2.5"
        >
          <div class="flex items-end">
            <span class="text-base text-zinc-900 dark:text-zinc-200 mr-1 translate-y-[-3px]">
              支付金额:
            </span>
            <div class="text-2xl tracking-tighter font-bold text-orange-600">
              <span class="text-base">￥</span>
              <span>{{ currentMembershiPlanListItem.price }}</span>
            </div>
          </div>

          <div class="flex mt-2">
            <div
              class="min-w-[150px] border border-solid border-zinc-200 dark:border-zinc-600 rounded-sm p-1 flex items-center justify-center cursor-pointer duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <img src="@/assets/images/alipay.png" class="w-3.5 h-3.5 mr-1" />
              <div class="text-base text-zinc-800 dark:text-zinc-200">支付宝</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 手机端的 UI -->
    <template v-else>
      <div ref="mobileContentContainer" class="fixed bottom-0 right-0 left-0 bg-white">
        <!-- 倒计时 -->
        <div
          class="flex justify-center p-1 items-center bg-orange-100 border-orange-300 border-t border-b border-solid"
        >
          <SVGIcon name="countdown" class="w-1.5 h-1.5 mr-1" fillClass="fill-red-600" />
          <!-- 倒计时数字 -->
          <div class="text-[14px] text-red-600 font-bold flex">
            <div class="mr-0.5">限时优惠|距离倒计时结束仅剩</div>
            <CountDown :endTime="dayjs().add(60, 'second')" @onFinish="handleCountDownFinish" />
          </div>
        </div>
        <!-- 金额 -->
        <div class="flex justify-between p-1">
          <div class="flex items-end translate-y-[-5px]">
            <span class="text-base text-zinc-900 dark:text-zinc-200 mr-1 translate-y-[-3px]">
              支付金额:
            </span>
            <div class="text-2xl tracking-tighter font-bold text-orange-600">
              <span class="text-base">￥</span>
              <span>{{ currentMembershiPlanListItem.price }}</span>
            </div>
          </div>
          <Button type="main" class="min-w-[120px]">立即开通</Button>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './Payment.scss';
</style>
