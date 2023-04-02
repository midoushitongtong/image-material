<script setup lang="ts">
import PCHeader from '@/components/pc-header/PCHeader.vue';
import { useAppStore } from '@/store/resources/app';
import MobileNavigationBar from '@/components/mobile-navigation-bar/MobileNavigationBar.vue';
import { computed, onMounted, ref } from 'vue';
import { showMessageTooltip } from '@/components/message-tooltip';
import PaymentResult_ from '@/components/payment-result/PaymentResult.vue';
import { useRoute } from 'vue-router';

// app store
const appStore = useAppStore();
// device type
const deviceType = computed(() => appStore.deviceType);
// route
const route = useRoute();
// order id
const orderId = ref<string | undefined>(undefined);

// init data
const initData = async () => {
  try {
    orderId.value = route.query.orderId as string;
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
</script>

<template>
  <div class="payment-result">
    <!-- header -->
    <PCHeader v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'" hiddenSearch />

    <div
      class="payment-result-content-container flex justify-center items-start min-h-[100vh] bg-[#f5f5f5] dark:bg-zinc-800 duration-300"
    >
      <div
        class="overflow-hidden w-[100%] max-w-screen-lg bg-white dark:bg-zinc-900 duration-300 rounded-sm mobile:rounded-none border border-solid border-zinc-200 dark:border-zinc-600 mobile:border-0 p-4 mobile:p-0 m-2 mobile:m-0"
      >
        <!-- 手机端头部 -->
        <MobileNavigationBar sticky v-if="deviceType === 'MOBILE'">
          <div class="text-base font-bold text-center dark:text-zinc-300">支付结果</div>
        </MobileNavigationBar>

        <PaymentResult_ v-if="orderId" :orderId="orderId" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PaymentResult.scss';
</style>
