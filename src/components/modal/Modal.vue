<script setup lang="ts">
import { watch } from 'vue';

// define props
type Props = {
  visible: boolean;
};
const props = defineProps<Props>();

// define emits
const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (name: 'update:visible', visible: boolean): void;
}>();

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
    <div class="modal">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="visible"
          class="w-screen h-screen bg-zinc-900/60 fixed top-0 left-0 z-50"
          @click="emits('update:visible', false)"
        />
      </transition>

      <!-- 内容 -->
      <transition name="down-up">
        <div
          v-if="visible"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-900 fixed bottom-0 z-50"
        >
          <slot />
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
@import './Modal.scss'; ;
</style>
