<script setup lang="ts">
import PCHeader from '@/components/pc-header/PCHeader.vue';
import { useAppStore } from '@/store/resources/app';
import MobileNavigationBar from '@/components/mobile-navigation-bar/MobileNavigationBar.vue';
import { computed, onMounted, provide, ref } from 'vue';
import { getMembershipPlanList } from '@/apis/membership-plan';
import { showMessageTooltip } from '@/components/message-tooltip';
import type { MembershipPlanListItem } from '@/apis/membership-plan/types';
import MembershipPlanListItem_ from './MembershipPlanListItem.vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import Payment from './Payment.vue';
import PaymentResult from '@/components/payment-result/PaymentResult.vue';

// app store
const appStore = useAppStore();
// device type
const deviceType = computed(() => appStore.deviceType);
// init data loading
const initDataLoading = ref(false);
// membership plan list
const membershipPlanList = ref<MembershipPlanListItem[]>([]);
// 当前所选项
const currentMembershipPlanId = ref<string | undefined>(undefined);
// 当前所选项详情
const currentMembershiPlanListItem = computed(() => {
  return membershipPlanList.value.find((item) => item.id === currentMembershipPlanId.value);
});
// order id
const orderId = ref<string | undefined>(undefined);

// init data
const initData = async () => {
  try {
    initDataLoading.value = true;

    const result = await getMembershipPlanList();
    membershipPlanList.value = result.data;
    currentMembershipPlanId.value = result.data[0].id;

    initDataLoading.value = false;
  } catch (error) {
    console.log(error);

    showMessageTooltip({
      type: 'warn',
      content: '服务器内部错误, 请稍后重试...',
      duration: 3000,
    });
  }
};

// on mounted
onMounted(() => {
  initData();
});

// provide
provide('orderId', orderId);
provide('currentMembershipPlanId', currentMembershipPlanId);
</script>

<template>
  <div class="membership-plan">
    <!-- header -->
    <PCHeader v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'" hiddenSearch />

    <div
      class="membership-plan-content-container flex justify-center items-start min-h-[100vh] bg-[#f5f5f5] dark:bg-zinc-800 duration-300"
    >
      <div
        class="overflow-hidden w-[100%] max-w-screen-lg bg-white dark:bg-zinc-900 duration-300 rounded-sm mobile:rounded-none border border-solid border-zinc-200 dark:border-zinc-600 mobile:border-0 p-4 mobile:p-0 m-2 mobile:m-0"
      >
        <!-- 手机端头部 -->
        <MobileNavigationBar sticky v-if="deviceType === 'MOBILE'">
          <div class="text-base font-bold text-center dark:text-zinc-300">精选VIP</div>
        </MobileNavigationBar>

        <!-- 内容 -->
        <template v-if="!initDataLoading">
          <div v-if="!orderId" class="w-full h-full p-2.5 mobile:p-1.5 pt-1 mobile:pt-3.5 text-base">
            <div class="text-2xl font-bold text-center tracking-widest text-yellow-600">精选VIP</div>
            <div class="mt-1.5 text-center text-yellow-500 text-base">升级精选VIP, 畅享所有内容</div>

            <!-- vip 列表 -->
            <div class="flex mt-3.5 overflow-x-auto scrollbar pb-[26px]">
              <MembershipPlanListItem_
                v-for="item of membershipPlanList"
                :key="item.id"
                :item="item"
                :active="currentMembershipPlanId === item.id"
                @onClick="currentMembershipPlanId = item.id"
              />
            </div>

            <!-- 描述 -->
            <div class="mt-1 text-sm text-zinc-500" v-if="currentMembershiPlanListItem?.desc">
              {{ currentMembershiPlanListItem.desc }}
            </div>

            <!-- payment -->
            <Payment
              v-if="currentMembershiPlanListItem"
              :currentMembershiPlanListItem="currentMembershiPlanListItem"
            />
          </div>
          <PaymentResult v-else :orderId="orderId" />
        </template>
        <!-- loading -->
        <div v-else class="p-2">
          <SVGIcon class="w-4 h-4 mx-auto animate-spin" name="infinite-load" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MembershipPlan.scss';
</style>
