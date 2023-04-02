<script setup lang="ts">
import Button from '@/components/button/Button.vue';
import { ref, watch } from 'vue';

type Props = {
  // 显示/隐藏
  visible: boolean;
  // 容器 class
  containerClass?: string;
  // 宽度
  width?: string;
  // 标题
  title?: string;
  // 取消按钮文本
  cancelText?: string;
  // 确定按钮文本
  confirmText?: string;
  // 取消按钮点击事件
  onCancel?: () => void;
  // 确定按钮点击事件
  onConfirm?: () => void;
};

// define props
const props = defineProps<Props>();

// define emits
const emits = defineEmits<{
  (_name: 'update:visible', _visible: boolean): void;
}>();

// confirm loaidng
const confirmLoading = ref(false);

// close
const closeModal = () => {
  emits('update:visible', false);
};

// cancel
const handleCancel = async () => {
  if (props.onCancel) {
    await props.onCancel();
  }

  closeModal();
};

// confirm
const handleConfirm = async () => {
  confirmLoading.value = true;

  try {
    if (props.onConfirm) {
      await props.onConfirm();
    }
  } catch (error) {
    console.log(error);
  }

  confirmLoading.value = false;

  closeModal();
};

// modal 显示锁定滚动条, modal 隐藏解锁滚动条
watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <teleport to="body">
    <div :class="['modal', containerClass]">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="visible"
          class="w-screen h-screen bg-zinc-900/60 fixed top-0 left-0 z-50"
          @click="closeModal"
        />
      </transition>

      <!-- 内容 -->
      <transition name="down-up">
        <div
          v-if="visible"
          class="content-container z-50 fixed top-0 left-0 right-0 flex justify-center items-start pt-10"
          @click="closeModal"
        >
          <div
            @click.stop="() => {}"
            class="content-inner-container bg-white dark:bg-zinc-900 overflow-y-auto max-w-[85vw] max-h-[85vh] p-2 rounded-sm border border-solid border-zinc-200 dark:border-zinc-600"
            :style="{
              width,
            }"
          >
            <!-- 标题 -->
            <div v-if="title" class="text-lg font-bold text-zinc-900 dark:text-zinc-200 pb-2">
              {{ title }}
            </div>
            <!-- 内容 -->
            <div class="text-base text-zinc-900 dark:text-zinc-200">
              <slot />
            </div>
            <!-- 按钮 -->
            <div class="pt-2 flex justify-end" v-if="cancelText || confirmText">
              <Button v-if="cancelText" type="info" @click="handleCancel">{{ cancelText }}</Button>
              <Button v-if="confirmText" class="ml-2" :loading="confirmLoading" @click="handleConfirm">{{
                confirmText
              }}</Button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
@import './Modal.scss'; ;
</style>
