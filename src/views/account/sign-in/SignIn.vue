<script setup lang="ts">
import AccountHeader from '@/components/account-header/AccountHeader.vue';
import SliderCaptcha from '@/components/slider-captcha/SliderCaptcha.vue';
import Button from '@/components/button/Button.vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import * as Yup from 'yup';
import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { getUserInfo, signIn } from '@/apis/account';
import { showMessageTooltip } from '@/components/message-tooltip';
import { useAccountStore } from '@/store/resources/account';
import { useRoute, useRouter } from 'vue-router';

// form ref
const formRef = ref();
// route
const route = useRoute();
// router
const router = useRouter();
// account store
const accountStore = useAccountStore();
// form values
const formValues = ref({
  username: '',
  password: '',
});
// form rules
const formRules = Yup.object().shape({
  username: Yup.string().required('请输入用户名'),
  password: Yup.string().required('请输入密码'),
});
// 控制 captcha 展示
const visibleCaptcha = ref(false);
// submit loading
const submitLoading = ref(false);

// handle submit
const handleSubmit = async () => {
  const values = {
    ...formValues.value,
  };

  submitLoading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    // 登录
    const result = await signIn(values);

    if (result.status === '1') {
      showMessageTooltip({
        type: 'warn',
        content: '用户名或密码不正确...',
        duration: 3000,
      });
      return;
    }
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
  } catch (error) {
    console.log(error);

    showMessageTooltip({
      type: 'warn',
      content: '服务器内部错误, 请稍后重试...',
      duration: 3000,
    });
  } finally {
    submitLoading.value = false;
  }
};

// 人机验证
const handleCaptcha = async () => {
  const result = await formRef.value.validate();

  if (result.valid) {
    visibleCaptcha.value = true;
  }
};

// init data
const initData = () => {
  if (route.query?.showNeedAuthTooltip === 'true') {
    showMessageTooltip({
      type: 'warn',
      content: '请登录后在进行此操作!',
      duration: 3000,
    });
    router.replace({
      name: 'AccountSignIn',
    });
  }
};

// on mounted
onMounted(() => {
  initData();
});
</script>

<template>
  <div class="sign-in">
    <div class="relative bg-zinc-200 dark:bg-zinc-800 mobile:bg-white min-h-screen text-center">
      <AccountHeader />

      <!-- 表单区域 -->
      <div class="p-2 mt-1 mobile:mt-0 mobile:pt-0 mx-auto max-w-[450px]">
        <div
          class="p-2 dark:bg-zinc-800 pc-and-tablet:bg-white pc-and-tablet:dark:bg-zinc-900 pc-and-tablet:rounded-sm pc-and-tablet:shadow-lg"
        >
          <!-- 标题 -->
          <h3 class="mb-3.5 font-semibold text-[20px] text-zinc-900 dark:text-zinc-300">账号登录</h3>

          <!-- 表单 -->
          <VeeForm ref="formRef" :validationSchema="formRules">
            <!-- 用户名 -->
            <VeeField
              name="username"
              validateOnInput
              v-model="formValues.username"
              v-slot="{ field, errorMessage }"
            >
              <div class="mb-2">
                <div class="leading-[0px]">
                  <input
                    v-bind="field"
                    :class="[
                      'w-[100%] h-[40px] text-[14px] leading-[17px] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-400 border border-solid border-zinc-300 text-base outline-0 p-1 rounded-sm duration-200 focus:border-main dark:focus:border-zinc-200',
                      errorMessage && 'border-form-error shadow-form-error',
                    ]"
                    type="text"
                    placeholder="用户名"
                  />
                </div>
                <div class="mt-[5px] text-left text-[14px] text-form-error">{{ errorMessage }}</div>
              </div>
            </VeeField>
            <!-- 密码 -->
            <VeeField
              name="password"
              validateOnInput
              v-model="formValues.password"
              v-slot="{ field, errorMessage }"
            >
              <div class="mb-2">
                <div class="leading-[0px]">
                  <input
                    v-bind="field"
                    :class="[
                      'w-[100%] h-[40px] text-[14px] leading-[17px] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-400 border border-solid border-zinc-300 text-base outline-0 p-1 rounded-sm duration-200 focus:border-main dark:focus:border-zinc-200',
                      errorMessage && 'border-form-error shadow-form-error',
                    ]"
                    type="password"
                    placeholder="密码"
                  />
                </div>
                <div class="mt-[5px] text-left text-[14px] text-form-error">{{ errorMessage }}</div>
              </div>
            </VeeField>
            <!-- 跳转按钮 -->
            <div class="mb-2 flex justify-end">
              <RouterLink
                :to="{
                  name: 'AccountSignUp',
                }"
                class="block text-zinc-400 dark:text-zinc-600 text-right hover:text-zinc-600 dark:hover:text-zinc-400 text-[13px] duration-300 cursor-pointer"
              >
                还没有账号? 立即注册
              </RouterLink>
            </div>
            <!-- 登录按钮 -->
            <div class="mb-2">
              <Button class="!w-full dark:bg-zinc-900" :loading="submitLoading" @click="handleCaptcha">
                登录
              </Button>
            </div>
            <!-- 第三方登录 -->
            <div class="py-2 flex justify-center">
              <SVGIcon class="w-4 h-4 mx-0.5 cursor-pointer" name="qq" />
              <SVGIcon class="w-4 h-4 mx-0.5 cursor-pointer" name="wexin" />
            </div>
          </VeeForm>
        </div>
      </div>
    </div>

    <!-- slider captcha -->
    <SliderCaptcha
      v-if="visibleCaptcha"
      @close="visibleCaptcha = false"
      @success="
        () => {
          visibleCaptcha = false;
          handleSubmit();
        }
      "
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SignIn.scss';
</style>
