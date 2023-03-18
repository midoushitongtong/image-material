<script setup lang="ts">
import FormItemInput from '@/components/form-item-input/FormItemInput.vue';
import MobileNavigationBar from '@/components/mobile-navigation-bar/MobileNavigationBar.vue';
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { useAccountStore } from '@/store/resources/account';
import { useAppStore } from '@/store/resources/app';
import { computed, ref } from 'vue';
import * as Yup from 'yup';
import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import Button from '@/components/button/Button.vue';
import { getUserInfo, updateProfile } from '@/apis/account';
import { showMessageTooltip } from '@/components/message-tooltip';
import { showConfirmModal } from '@/utils/confirm-modal';
import { chechRouteNeedAuth } from '@/utils/router';
import { useRoute } from 'vue-router';
import AvatarDetailModal from './AvatarDetailModal.vue';
import PCHeader from '@/components/pc-header/PCHeader.vue';

// form ref
const formRef = ref();
// modal ref
const avatarDetailModalRef = ref();
// route
const route = useRoute();
// app store
const appStore = useAppStore();
// user store
const accountStore = useAccountStore();
// device type
const deviceType = computed(() => appStore.deviceType);
// user info
const userInfo = computed(() => accountStore.userInfo);
// form values
const formValues = ref({
  username: userInfo.value?.username,
  company: userInfo.value?.company,
  title: userInfo.value?.title,
  homePage: userInfo.value?.homePage,
  introduction: userInfo.value?.introduction,
});
// form rules
const formRules = Yup.object().shape({
  username: Yup.string().required('请输入用户名').max(20, '用户名字符长度应在 1~20 个之间'),
  company: Yup.string(),
  title: Yup.string(),
  homePage: Yup.string(),
  introduction: Yup.string().max(100, '个人介绍字符长度应在 100 个以内'),
});
// 提交 loading
const submitLoading = ref(false);

// 选中头像文件
const handleAvatarChange = (e: Event) => {
  // @ts-ignore
  const file = e.target?.files?.[0] as File;
  if (file) {
    avatarDetailModalRef.value.initModal({
      file,
    });
  }

  // 清空 input target value (不清空的话同一个文件无法选择两次)
  // @ts-ignore
  e.target.value = null;
};

// submit
const handleSubmit = async () => {
  const result = await formRef.value.validate();

  if (result.valid) {
    const values = {
      ...formValues.value,
    };

    submitLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // 更新用户信息
      const result = await updateProfile(values);

      if (result.status !== '200') {
        throw new Error(`未知 status: ${result.status}`);
      }

      // 获取用户信息
      const result2 = await getUserInfo();

      if (result.status !== '200') {
        throw new Error(`未知 status: ${result2.status}`);
      }

      accountStore.updateUserInfo(result2.data);

      showMessageTooltip({
        type: 'success',
        content: '个人资料更新成功',
        duration: 3000,
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
  }
};

// 退出登录
const logout = async () => {
  await showConfirmModal({
    content: '确认退出登录吗？',
    onConfirm: () => {
      // 退出登录
      accountStore.signOut();
      // 检测路由是否需要登录，如果需要跳转到登录页面
      chechRouteNeedAuth({
        route,
        showNeedAuthTooltip: false,
      });
      // 提示用户退出成功
      showMessageTooltip({
        type: 'success',
        content: '退出成功...',
        duration: 3000,
      });
    },
  });
};
</script>

<template>
  <div class="user-profile" v-if="userInfo">
    <!-- header -->
    <PCHeader v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'" hiddenSearch />

    <div
      class="overflow-hidden flex justify-center items-start min-h-[100vh] bg-[#f5f5f5] dark:bg-zinc-800 duration-300"
    >
      <div
        class="w-[100%] max-w-screen-lg relative bg-white dark:bg-zinc-900 duration-300 rounded-sm mobile:rounded-none border border-solid border-zinc-200 dark:border-zinc-600 mobile:border-0 p-4 mobile:p-0 m-2 mobile:m-0"
      >
        <!-- 手机端头部 -->
        <MobileNavigationBar sticky v-if="deviceType === 'MOBILE'">
          <div class="text-base font-bold text-center dark:text-zinc-300">个人资料</div>
        </MobileNavigationBar>
        <!-- 电脑和平板端: 标题 -->
        <div
          v-if="deviceType === 'DESKTOP' || deviceType === 'TABLET'"
          class="text-lg font-bold text-center dark:text-zinc-300"
        >
          个人资料
        </div>

        <!-- 内容 -->
        <div
          class="w-full h-full p-2.5 mobile:p-1.5 mt-2 mobile:mt-0 text-sm flex flex-wrap mobile:flex-col-reverse"
        >
          <!-- 输入框部分 -->
          <div class="w-[65%] mobile:w-[100%] pr-11 mobile:pr-0">
            <!-- 表单 -->
            <VeeForm ref="formRef" :validationSchema="formRules">
              <!-- 用户名 -->
              <VeeField
                name="username"
                validateOnInput
                v-model="formValues.username"
                v-slot="{ field, errorMessage }"
              >
                <FormItemInput
                  label="用户名"
                  :value="field.value as string || undefined"
                  :error="!!errorMessage"
                  :errorMessage="errorMessage"
                  :max="20"
                  @onChange="field?.['onUpdate:modelValue']"
                />
              </VeeField>
              <!-- 公司 -->
              <VeeField
                name="company"
                validateOnInput
                v-model="formValues.company"
                v-slot="{ field, errorMessage }"
              >
                <FormItemInput
                  label="公司"
                  :value="field.value as string || undefined"
                  :error="!!errorMessage"
                  :errorMessage="errorMessage"
                  @onChange="field?.['onUpdate:modelValue']"
                />
              </VeeField>
              <!-- 职位 -->
              <VeeField
                name="title"
                validateOnInput
                v-model="formValues.title"
                v-slot="{ field, errorMessage }"
              >
                <FormItemInput
                  label="职位"
                  :value="field.value as string || undefined"
                  :error="!!errorMessage"
                  :errorMessage="errorMessage"
                  @onChange="field?.['onUpdate:modelValue']"
                />
              </VeeField>
              <!-- 个人主页 -->
              <VeeField
                name="homePage"
                validateOnInput
                v-model="formValues.homePage"
                v-slot="{ field, errorMessage }"
              >
                <FormItemInput
                  label="个人主页"
                  :value="field.value as string || undefined"
                  :error="!!errorMessage"
                  :errorMessage="errorMessage"
                  @onChange="field?.['onUpdate:modelValue']"
                />
              </VeeField>
              <!-- 个人介绍 -->
              <VeeField
                name="introduction"
                validateOnInput
                v-model="formValues.introduction"
                v-slot="{ field, errorMessage }"
              >
                <FormItemInput
                  label="个人介绍"
                  type="textarea"
                  :value="field.value as string || undefined"
                  :error="!!errorMessage"
                  :errorMessage="errorMessage"
                  :max="100"
                  :height="150"
                  @onChange="field?.['onUpdate:modelValue']"
                />
              </VeeField>

              <!-- 保存按钮 -->
              <div class="mb-2.5 pl-10 mobile:pl-0">
                <Button class="!w-full dark:bg-zinc-900" :loading="submitLoading" @click="handleSubmit">
                  保存
                </Button>
              </div>

              <!-- 退出登录按钮 -->
              <div class="mb-2.5 pl-10 mobile:pl-0">
                <Button type="info" class="!w-full dark:bg-zinc-900" @click="logout"> 退出登录 </Button>
              </div>
            </VeeForm>
          </div>

          <!-- 头像部分 -->
          <div class="w-[35%] mobile:w-[100%] mobile:mb-3">
            <div class="mb-2 font-black text-sm dark:text-zinc-300">我的头像</div>
            <label for="avatar" class="flex relative w-[100px] h-[100px] group cursor-pointer">
              <img :src="userInfo.avatar" class="rounded-full w-full h-full object-cover" />
              <div
                class="absolute top-0 left:0 rounded-full w-full h-full bg-black/50 hidden group-hover:flex duration-300 items-center flex-col justify-center"
              >
                <SVGIcon name="change-header-image" class="w-2 h-2" />
                <div class="mt-0.5 text-xs text-white dark:text-zinc-300">点击更换头像</div>
              </div>
              <!-- 隐藏域 -->
              <input
                v-show="false"
                id="avatar"
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                @change="handleAvatarChange"
              />
            </label>
            <p class="mt-1 text-zinc-600 dark:text-zinc-500 text-xs">
              支持 png、jpg、jpeg、gif 格式，大小 5MB 内的图片
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 菜单 modal, 点击按钮弹出 -->
    <AvatarDetailModal ref="avatarDetailModalRef" />
  </div>
</template>

<style lang="scss" scoped>
@import './Profile.scss';
</style>
