<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import { ref } from 'vue';
import SVGIcon from '../svg-icon/SVGIcon.vue';

// payment platform
export type PaymentPlatform = 'alipay';

// modla data
type ModalData = {
  onSelect: (_type: PaymentPlatform) => void;
};

// visible
const visible = ref(false);
// modal data
const modalData = ref<ModalData | undefined>(undefined);

// init modal
const initModal = (modalData_: ModalData) => {
  modalData.value = modalData_;
  visible.value = true;
};

// handle select
const handleSelect = (type: PaymentPlatform) => {
  visible.value = false;
  // 等待 modal 关闭动画执行完成后在执行回调
  setTimeout(() => {
    modalData.value?.onSelect && modalData.value.onSelect(type);
  }, 300);
};

// define expose
defineExpose({
  initModal,
});
</script>

<template>
  <Modal v-model:visible="visible" width="100vw" containerClass="mobile-select-payment-platform-modal">
    <div v-if="modalData" class="h-[80vh] flex flex-col">
      <div class="flex items-center">
        <h2 class="flex-1 text-base text-zinc-900 dark:text-zinc-200 font-bold px-1">选择支付方式</h2>
        <div
          class="flex items-center justify-center w-[50px] h-[50px] active:bg-zinc-200"
          @click="visible = false"
        >
          <SVGIcon class="w-2 h-2" name="close" fillClass="fill-zinc-900 dark:fill-znc-200" />
        </div>
      </div>
      <div class="overflow-y-auto pb-2">
        <!-- 支付宝 -->
        <div
          class="flex items-center px-2 py-2 border-b border-solid border-b-zinc-200 dark:border-zinc-600 active:bg-zinc-200"
          @click="handleSelect('alipay')"
        >
          <img src="@/assets/images/alipay.png" class="w-4 h-4" />
          <p class="text-xl ml-1 text-zinc-800 dark:text-zinc-200">支付宝</p>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
@import './MobileSelectPaymentPlatformModal.scss';
</style>

<style lang="scss">
.mobile-select-payment-platform-modal {
  .content-container {
    top: auto;
    bottom: 0;
    .content-inner-container {
      border-radius: 0;
      max-width: 100vw;
      max-height: 100vh;
      padding: 0;
      border-width: 0;
    }
  }
}
</style>
