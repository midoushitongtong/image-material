<script setup lang="ts">
import SVGIcon from '../svg-icon/SVGIcon.vue';

// define props
type Props = {
  icon: string;
  iconClass?: string;
  text?: string;
  textClass?: string;
};
defineProps<Props>();

// define emits
const emits = defineEmits<{
  (_name: 'click'): void;
}>();

// handle click
const handleClick = () => {
  emits('click');
};
</script>

<template>
  <div
    class="mobile-menu-item flex flex-col items-center justify-center py-0.5 px-2 active:opacity-75 duration-50"
    @click="handleClick"
  >
    <SVGIcon :name="icon" :class="iconClass" class="w-2 h-2" />
    <div :class="['mt-[3px] text-sm text-zinc-900 dark:text-zinc-200', textClass]">
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@import './MobileMenuItem.scss';
</style>
