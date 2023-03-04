<script setup lang="ts">
import { computed, onBeforeMount, watch } from 'vue';
import { useAppStore } from './store/resources/app';
import { deviceTypeEnquire } from './utils/device-type';
import type { DeviceType } from './utils/device-type/types';
import { useFonSize } from './hooks/use-font-size';
import { themeTypeEnquire, updateHTMLThemeType } from './utils/theme-type';
import { THEME_SYSTEM } from './constants';
import MobileMenu from './components/mobile-menu/MobileMenu.vue';
import TransitionRouterView from './components/transition-router-view/TransitionRouterView.vue';

// app store
const appStore = useAppStore();
// theme type
const themeType = computed(() => appStore.themeType);
// device type
const deviceType = computed(() => appStore.deviceType);
// font size
useFonSize();

// init site data
const initSiteData = async () => {
  // 当屏幕宽度发生变化, 修改 store 中设备类型(pc, desktop, mobile)
  deviceTypeEnquire({
    callback: (deviceType: DeviceType) => {
      appStore.updateDeviceType(deviceType);
    },
  });
  // 当系统主题发生变化, 修改主题
  themeTypeEnquire({
    callback: (systemThemeType: string) => {
      // 只有是跟随系统, 才需要修改
      if (themeType.value === THEME_SYSTEM) {
        updateHTMLThemeType(systemThemeType);
      }
    },
    addListener: true,
  });
};

// watch
watch(
  themeType,
  (newValue) => {
    if (newValue === THEME_SYSTEM) {
      // 如果是跟随系统, 获取系统当前主题
      themeTypeEnquire({
        callback: (systemThemeType: string) => {
          updateHTMLThemeType(systemThemeType);
        },
        addListener: false,
      });
    } else {
      updateHTMLThemeType(newValue);
    }
  },
  {
    immediate: true,
  }
);

// on before mount
onBeforeMount(() => {
  initSiteData();
});
</script>

<template>
  <div id="app-container">
    <!-- 电脑端和平板端 -->
    <router-view v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'" />
    <!-- 手机端需要路由动画 -->
    <TransitionRouterView v-else />

    <MobileMenu v-if="deviceType === 'MOBILE'" />
  </div>
</template>

<style lang="scss">
@import './App.scss';
</style>
