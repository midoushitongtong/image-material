<script setup lang="ts">
import AccountHeader from '@/components/account-header/AccountHeader.vue';
import SliderCaptcha from '@/components/slider-captcha/SliderCaptcha.vue';
import Button from '@/components/button/Button.vue';
import * as Yup from 'yup';
import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { getUserInfo, signUp } from '@/apis/account';
import { showMessageTooltip } from '@/components/message-tooltip';
import { useAccountStore } from '@/store/resources/account';
import { useRouter } from 'vue-router';
import PCHeader from '@/components/pc-header/PCHeader.vue';
import { useAppStore } from '@/store/resources/app';

// app store
const appStore = useAppStore();
// device type
const deviceType = computed(() => appStore.deviceType);
// form ref
const formRef = ref();
// router
const router = useRouter();
// account store
const accountStore = useAccountStore();
// form values
const formValues = ref({
  username: '',
  password: '',
  confirmPassword: '',
});
// form rules
const formRules = Yup.object().shape({
  username: Yup.string().required('请输入用户名').max(20, '用户名长度应在1~20位之间'),
  password: Yup.string().required('请输入密码'),
  confirmPassword: Yup.string()
    .test('confirm-password', '两次输入密码不一致', function (value) {
      return this.parent.password === value;
    })
    .required('请输入确认密码'),
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
    const result = await signUp(values);

    if (result.status === '2') {
      showMessageTooltip({
        type: 'warn',
        content: '此用户名已被注册, 请更换用户名后重试',
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
      content: '注册成功',
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

// 表单验证
watch(
  () => formValues.value.password,
  () => {
    if (formValues.value.confirmPassword) {
      formRef.value.validateField(['confirmPassword']);
    }
  }
);
</script>

<template>
  <div class="sign-in">
    <!-- header -->
    <PCHeader v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'" hiddenSearch />

    <div class="relative bg-zinc-200 dark:bg-zinc-800 mobile:bg-white min-h-screen text-center">
      <AccountHeader />

      <!-- 表单区域 -->
      <div class="p-2 mt-1 mobile:mt-0 mobile:pt-0 mx-auto max-w-[450px]">
        <div
          class="p-2 dark:bg-zinc-800 pc-and-tablet:bg-white pc-and-tablet:dark:bg-zinc-900 pc-and-tablet:rounded-sm pc-and-tablet:shadow-lg"
        >
          <!-- 标题 -->
          <h3 class="mb-3.5 font-semibold text-[20px] text-zinc-900 dark:text-zinc-300">账号注册</h3>

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
            <!-- 确认密码 -->
            <VeeField
              name="confirmPassword"
              validateOnInput
              v-model="formValues.confirmPassword"
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
                    placeholder="确认密码"
                  />
                </div>
                <div class="mt-[5px] text-left text-[14px] text-form-error">{{ errorMessage }}</div>
              </div>
            </VeeField>
            <!-- 跳转按钮 -->
            <div class="mb-2 flex justify-end">
              <RouterLink
                :to="{
                  name: 'AccountSignIn',
                }"
                class="block text-zinc-400 dark:text-zinc-600 text-right hover:text-zinc-600 dark:hover:text-zinc-400 text-[13px] duration-300 cursor-pointer"
              >
                已有账号? 立即登录
              </RouterLink>
            </div>
            <!-- 注册协议 -->
            <div class="mb-2 flex justify-center">
              <div
                class="block text-zinc-400 dark:text-zinc-600 text-right hover:text-zinc-600 dark:hover:text-zinc-400 text-[13px] duration-300 cursor-pointer"
                @click="
                  showMessageTooltip({
                    type: 'warn',
                    content: '此功能尚未完善...',
                    duration: 3000,
                  })
                "
              >
                注册即代表您同意《Image Material 注册协议》
              </div>
            </div>
            <!-- 注册按钮 -->
            <div class="mb-2">
              <Button class="!w-full dark:bg-zinc-900" :loading="submitLoading" @click="handleCaptcha">
                注册
              </Button>
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
@import './SignUp.scss';
</style>
