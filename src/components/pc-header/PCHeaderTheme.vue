<script setup lang="ts">
import Popover from '@/components/popover/Popover.vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants';
import { useAppStore } from '@/store/resources/app';
import { computed } from 'vue';

// app store
const appStore = useAppStore();
// theme type
const themeType = computed(() => appStore.themeType);
// 可用的主题
const themeList = [
  {
    id: '1',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白',
  },
  {
    id: '2',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑',
  },
  {
    id: '3',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统',
  },
];
// 当前的主题 icon
const svgIcon = computed(() => themeList.find((item) => item.type === themeType.value)?.icon || '');

// 修改主题
const changeTheme = (themeType: string) => {
  appStore.updateThemeType(themeType);
};
</script>

<template>
  <div class="mr-1">
    <Popover placement="bottomRight" class="theme-popover">
      <SVGIcon
        :name="svgIcon"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-900 dark:fill-zinc-300"
      />

      <!-- 气泡视图展示的内容 -->
      <template #content>
        <div class="w-[140px] overflow-hidden">
          <div
            v-for="item of themeList"
            :key="item.id"
            class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
            @click="changeTheme(item.type)"
          >
            <SVGIcon
              :name="item.icon"
              class="w-1.5 h-1.5 mr-1 flex-none"
              fillClass="fill-zinc-900 dark:fill-zinc-300"
            />
            <span class="text-sm text-zinc-800 dark:text-zinc-300">{{ item.name }}</span>
          </div>
        </div>
      </template>
    </Popover>
  </div>
</template>

<style lang="scss" scoped>
@import './PCHeaderTheme.scss';
</style>
