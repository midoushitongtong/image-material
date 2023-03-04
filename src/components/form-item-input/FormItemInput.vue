<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import { computed, ref } from 'vue';

// define props
type Props = {
  // value
  value?: string;
  // label
  label: string;
  // type
  type?: 'text' | 'textarea';
  // max
  max?: number;
  // height
  height?: number;
  // error
  error?: boolean;
  // error message
  errorMessage?: string;
};
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

// define emits
const emits = defineEmits<{
  (_name: 'onChange', _value?: string): void;
}>();

// ref
const maxContainerRef = ref();
// element bounding
const { width: maxContainerWidth } = useElementBounding(maxContainerRef);
// 输入的字符长度
const valueLength = computed(() => {
  return props.value?.length || 0;
});

// 错误样式
const errorClass = computed(() => {
  let error = false;
  if (props.error) {
    // props 控制 error
    error = true;
  } else if (props.max && valueLength.value > props.max) {
    // 字符长度 error
    error = true;
  }
  return error ? '!text-form-error !border-form-error !shadow-form-error' : '';
});

// style
const style = computed(() => {
  return {
    paddingRight: `${maxContainerWidth.value + 15}px`,
    height: props.height ? `${props.height}px` : '',
  };
});

// handle input
const handleInput = (e: Event) => {
  // @ts-ignore
  const value = e.target?.value;
  emits('onChange', value);
};
</script>

<template>
  <div class="form-item-input">
    <div class="flex items-start mobile:flex-col mb-2.5">
      <div
        class="w-10 mobile:w-[100%] min-h-[40px] mobile:min-h-0 mobile:mb-1 flex items-center truncate pr-1 mobile:pr-0 font-bold dark:text-zinc-300"
      >
        {{ label }}
      </div>
      <div class="flex-1 mobile:w-[100%]">
        <div class="relative leading-[0]">
          <!-- 单行输入框 -->
          <input
            v-if="type === 'text'"
            type="input"
            :class="[
              'w-[100%] h-[40px] text-[14px] leading-[17px] p-1 rounded-sm border border-solid border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 duration-200 text-zinc-900 dark:text-zinc-400 outline-0 focus:border-main dark:focus:border-zinc-200',
              errorClass,
            ]"
            :style="style"
            :value="value"
            @input="handleInput"
          />
          <!-- 多行输入框 -->
          <textarea
            v-if="type === 'textarea'"
            :class="[
              'w-[100%] h-[40px] text-[14px] leading-[17px] p-1 rounded-sm border border-solid border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 duration-200 text-zinc-900 dark:text-zinc-400 outline-0 focus:border-main dark:focus:border-zinc-200',
              errorClass,
            ]"
            :style="style"
            :value="value"
            @input="handleInput"
          />
          <!-- 字符数提示 -->
          <div
            v-if="max"
            ref="maxContainerRef"
            class="max-container absolute flex items-center right-[10px] bottom-0 h-[40px] text-zinc-400 text-[13px] leading-[17px]"
          >
            {{ valueLength + ' / ' + max }}
          </div>
        </div>
        <!-- 错误提示 -->
        <div v-if="errorMessage" class="mt-[5px] text-left text-[14px] text-form-error">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './FormItemInput.scss';
</style>
