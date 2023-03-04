<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { routerHistoryIdList } from '@/router';

// router
const router = useRouter();
// transition name
const transitionName = ref('');
// refresh key
const refreshKey = ref<Record<string, string>>({});

// 路由守卫
router.beforeEach(async (to, form, next) => {
  const toRouterHistoryId = to.query.routerHistoryId as string | undefined;
  const formRouterHistoryId = form.query.routerHistoryId as string | undefined;

  // 保存历史 id
  if (toRouterHistoryId && !routerHistoryIdList.includes(toRouterHistoryId)) {
    routerHistoryIdList.push(toRouterHistoryId);
  }

  const toIndex = routerHistoryIdList.findIndex((item) => item === toRouterHistoryId);
  const formIndex = routerHistoryIdList.findIndex((item) => item === formRouterHistoryId);

  if (
    to.name &&
    form.name &&
    to.name !== form.name &&
    // 部分路由不需要动画
    form.name !== 'ImageMaterialDetail' &&
    to.name !== 'ImageMaterialDetail'
  ) {
    transitionName.value = toIndex > formIndex ? 'forward' : 'backward';

    if (!(toIndex > formIndex)) {
      // 等待路由动画结束后
      setTimeout(() => {
        // 从历史中移除
        routerHistoryIdList.splice(formIndex);
        // 销毁此组件
        if (formRouterHistoryId) {
          refreshKey.value[formRouterHistoryId] = Math.random() + '';
        }
      }, 500);
    }
  }

  next();
});
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition class="router-view" :name="transitionName">
      <keep-alive>
        <component
          :is="Component"
          :key="
            // @ts-ignore
            refreshKey[route.query.routerHistoryId] // @ts-ignore
              ? refreshKey[route.query.routerHistoryId]
              : route.fullPath
          "
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<styl lang="scss">
@import './TransitionRouterView.scss';
</styl>
