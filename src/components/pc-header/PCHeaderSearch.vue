<script setup lang="ts">
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import Button from '@/components/button/Button.vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

// define props
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

// define emits
const emits = defineEmits([
  'update:value',
  'onSubmitSearch',
  'onClearValue',
  'onFocusInput',
  'onBlurInput',
]);

// container ref
const containerRef = ref();
// 是否显示 dropdown
const visibleDropdown = ref(false);
// 点击 container 之外的区域关闭 dropdown
onClickOutside(containerRef, () => {
  visibleDropdown.value = false;
});

// handle input
const handleInputValue = (e: Event) => {
  // @ts-ignore
  emits('update:value', e.target?.value);
};

// handle focus input
const handleFocusInput = () => {
  visibleDropdown.value = true;
  emits('onFocusInput');
};

// handle blur input
const handleBlurInput = () => {
  emits('onBlurInput');
};

// handle clear
const handleClearValue = () => {
  // @ts-ignore
  emits('update:value', '');
  emits('onClearValue');
};

// handle submit search
const handleSubmitSearch = () => {
  emits('onSubmitSearch');
};
</script>

<template>
  <div class="relative mr-1 flex-1" ref="containerRef">
    <div class="group p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
      <!-- 搜索图标 -->
      <SVGIcon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute top-[50%] left-2 translate-y-[-50%]"
      />
      <!-- 输入框 -->
      <input
        type="text"
        class="group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 block w-full h-[44px] pl-4 pr-9 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tranking-wide text-sm font-semibold border border-solid border-zinc-100 dark:border-zinc-700 focus:border-red-300 duration-500"
        placeholder="搜索"
        :value="props.value"
        @input="handleInputValue"
        @keyup.enter="handleSubmitSearch"
        @focus="handleFocusInput"
        @blur="handleBlurInput"
      />
      <!-- 删除按钮 -->
      <SVGIcon
        v-show="props.value"
        name="input-delete"
        color="#707070"
        class="w-1.5 h-1.5 absolute top-[50%] right-7 translate-y-[-50%] duration-500 cursor-pointer"
        @click="handleClearValue"
      />
      <!-- 分割线 -->
      <div
        class="group-hover:opacity-100 opacity-0 w-[1px] h-1.5 absolute top-[50%] translate-y-[-50%] right-[59px] duration-500 bg-zinc-200"
      />
      <!-- 搜索按钮 -->
      <Button
        icon-name="search"
        iconColor="#fff"
        class="group-hover:opacity-100 opacity-0 absolute top-[50%] translate-y-[-50%] right-1 rounded-full duration-500"
        @click="handleSubmitSearch"
      />
    </div>

    <!-- 下拉区域 -->
    <transition name="slide">
      <div
        v-if="visibleDropdown"
        class="max-h-[368px] z-20 overflow-y-auto text-sm bg-white dark:bg-zinc-800 absolute top-[57px] left-0.5 right-0.5 p-2 rounded border border-solid border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-lg"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeaderSearch.scss';
</style>
