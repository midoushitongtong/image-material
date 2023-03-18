<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { showMessageTooltip } from '@/components/message-tooltip';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { getUserInfo, signIn } from '@/apis/account';
import { useAccountStore } from '@/store/resources/account';
import { useRouter } from 'vue-router';

// router
const router = useRouter();
// account store
const accountStore = useAccountStore();
// init data loading
const initDataLoading = ref(false);

// init data
const initData = async () => {
  try {
    initDataLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const values = {
      a: '1',
    };

    // 登录
    const result = await signIn(values);

    if (result.status !== '200') {
      throw new Error(`未知 status: ${result.status}`);
    }

    // 保存 accessToken
    accountStore.updateAccessToken(result.data.accessToken);

    // 获取用户信息
    const result2 = await getUserInfo();

    if (result.status !== '200') {
      throw new Error(`未知 status: ${result2.status}`);
    }

    accountStore.updateUserInfo(result2.data);

    showMessageTooltip({
      type: 'success',
      content: '登录成功',
      duration: 3000,
    });

    router.push({
      name: 'Home',
    });

    initDataLoading.value = false;
  } catch (error) {
    console.log(error);

    showMessageTooltip({
      type: 'warn',
      content: '服务器内部错误, 请稍后重试...',
      duration: 3000,
    });
  }
};

// on mounted
onMounted(() => {
  initData();
});
</script>

<template>
  <div class="oauth">
    <!-- loading -->
    <div class="p-2" v-if="initDataLoading">
      <SVGIcon class="w-4 h-4 mx-auto animate-spin" name="infinite-load" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Oauth.scss';
</style>
