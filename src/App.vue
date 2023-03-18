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
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import duration from 'dayjs/plugin/duration';
import { useRoute } from 'vue-router';

// route
const route = useRoute();
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

  // 设置 dayjs
  dayjs.locale('zh');
  dayjs.extend(duration);
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

    <!-- 移动端菜单 -->
    <MobileMenu
      v-if="
        route.name &&
        deviceType === 'MOBILE' &&
        // 部分页面不需要显示
        !['MembershipPlan'].includes(route.name as string)
      "
    />
  </div>
</template>

<style lang="scss">
@import './App.scss';
</style>
