<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import Button from '@/components/button/Button.vue';

// define props
const props = defineProps({
  // 标题
  title: {
    type: String,
  },
  // 内容
  content: {
    type: String,
    required: true,
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消',
  },
  // 确定按钮文本
  confirmText: {
    type: String,
    default: '确定',
  },
  // modal 关闭
  onClose: {
    type: Function,
  },
  // 取消按钮事件
  onCancel: {
    type: Function,
  },
  // 确定按钮事件
  onConfirm: {
    type: Function,
  },
});

// 动画时长
const transactionDuration = 300;
// css 动画时长
const cssTransactionDuration = computed(() => {
  return `${transactionDuration / 1000}s`;
});
// visible
const visible = ref(false);

// open modal
const openModal = () => {
  visible.value = true;
};

// close modal
const closeModal = () => {
  visible.value = false;
  // 等待 modal 关闭动画执行完成后在执行回调
  setTimeout(() => {
    if (props.onClose) {
      props.onClose();
    }
  }, transactionDuration);
};

// handle cancel
const handleCancel = () => {
  if (props.onCancel) {
    props.onCancel();
  }
  closeModal();
};

// handle confirm
const handleConfirm = () => {
  if (props.onConfirm) {
    props.onConfirm();
  }
  closeModal();
};

// on mounted
onMounted(() => {
  openModal();
});
</script>

<template>
  <div class="confirm-modal">
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="visible"
        class="w-screen h-screen bg-zinc-900/60 fixed top-0 left-0 z-50"
        @click="closeModal"
      />
    </transition>

    <!-- 内容 -->
    <transition name="modal-down-up">
      <div
        v-if="visible"
        class="w-[35%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-2 rounded-sm border border-solid border-zinc-200 dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xs:w-[80%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 文本 -->
        <div class="text-base tinc-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <Button type="info" class="mr-2" @click="handleCancel">
            {{ cancelText }}
          </Button>
          <Button type="primary" @click="handleConfirm">
            {{ confirmText }}
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import './ConfirmModal.scss';
</style>

<style lang="scss" scoped>
// fade 动画
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(cssTransactionDuration);
}
// 准备进入, 离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// modal 动画
.modal-down-up-enter-active,
.modal-down-up-leave-active {
  transition: all v-bind(cssTransactionDuration);
}
// 准备进入, 离开完成
.modal-down-up-enter-from,
.modal-down-up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
