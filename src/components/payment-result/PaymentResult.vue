<script setup lang="ts">
import { getMembershipPlanOrderStatus } from '@/apis/order';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../button/Button.vue';
import { showMessageTooltip } from '../message-tooltip';
import SVGIcon from '../svg-icon/SVGIcon.vue';

type Props = {
  orderId: string;
};

// define props
const props = defineProps<Props>();

// router
const router = useRouter();
// 支付结果
const paymentResult = ref<'pending' | 'success' | 'fail'>('pending');
// interval
const interval = ref();

// init data
const refreshPaymentResult = async () => {
  try {
    // 1. 调用 API 获取支付结果
    const result = await getMembershipPlanOrderStatus({
      orderId: props.orderId,
    });
    paymentResult.value = result.data.status;
  } catch (error) {
    console.log(error);

    showMessageTooltip({
      type: 'warn',
      content: '服务器内部错误, 请稍后重试...',
      duration: 3000,
    });
  }
};

// to home page
const toHomePage = () => {
  router.replace({
    name: 'Home',
  });
};

// on mounted
onMounted(() => {
  refreshPaymentResult();

  interval.value = setInterval(() => {
    refreshPaymentResult();
  }, 3000);
});

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});
</script>

<template>
  <div class="payment-result">
    <div class="w-full h-full p-2.5 text-base">
      <!-- 等待用户支付 -->
      <div v-if="paymentResult === 'pending'">
        <div class="text-2xl font-bold text-center tracking-widest">正在查询支付结果...</div>
      </div>
      <!-- 用户支付成功 -->
      <div v-if="paymentResult === 'success'">
        <div class="flex items-center justify-center">
          <SVGIcon name="pay-success" class="w-8 h-8 mr-3" />
          <p class="text-lg text-zinc-900 dark:text-zinc-200">支付成功</p>
        </div>
        <div class="mt-5 flex justify-center">
          <Button type="main" class="min-w-[150px]" @click="toHomePage">确定</Button>
        </div>
      </div>
      <!-- 用户支付失败 -->
      <div v-if="paymentResult === 'fail'">
        <div class="flex items-center justify-center">
          <SVGIcon name="pay-fail" class="w-8 h-8 mr-4" />
          <p class="text-lg text-zinc-900 dark:text-zinc-200">支付失败</p>
        </div>
        <div class="mt-5 flex justify-center">
          <Button type="main" class="min-w-[150px]" @click="toHomePage">确定</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './PaymentResult.scss';
</style>
