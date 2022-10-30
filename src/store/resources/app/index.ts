import { THEME_LIGHT } from '@/constants';
import type { DeviceType } from '@/utils/device-type/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAppStore = defineStore('app', () => {
  // ==================================================
  // state
  // ==================================================
  // deviceType
  const deviceType = ref<DeviceType>('DESKTOP');
  // 主题
  const themeType = ref(localStorage.getItem('themeType') || THEME_LIGHT);

  // ==================================================
  // actions
  // ==================================================
  const updateDeviceType = (deviceType_: typeof deviceType.value) => {
    deviceType.value = deviceType_;
  };

  const updateThemeType = (themeType_: typeof themeType.value) => {
    themeType.value = themeType_;
    localStorage.setItem('themeType', themeType_);
  };

  return {
    deviceType,
    themeType,
    updateDeviceType,
    updateThemeType,
  };
});

export { useAppStore };
