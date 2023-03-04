<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import { computed, nextTick, ref } from 'vue';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { useAppStore } from '@/store/resources/app';
import { uploadFile } from '@/apis/file';
import { showMessageTooltip } from '@/components/message-tooltip';
import { getUserInfo, updateProfile } from '@/apis/account';
import { useAccountStore } from '@/store/resources/account';

// modla data
type ModalData = {
  file: File;
};

// img ref
const imgRef = ref();
// visible
const visible = ref(false);
// modal data
const modalData = ref<ModalData | undefined>(undefined);
// app store
const appStore = useAppStore();
// account store
const accountStore = useAccountStore();
// device type
const deviceType = computed(() => appStore.deviceType);
// cropper
let cropper: Cropper | undefined = undefined;

// img src
const imgSrc = computed(() => {
  if (!modalData.value?.file) {
    return null;
  }
  const url = URL.createObjectURL(modalData.value?.file);
  return url;
});

// init cropper
const initCropper = () => {
  cropper = new Cropper(
    imgRef.value,
    deviceType.value === 'DESKTOP' || deviceType.value === 'TABLET'
      ? // pc 端和平板端配置
        {
          // 裁剪框固定纵横比
          aspectRatio: 1 / 1,
        }
      : // 手机端配置
        {
          // 裁剪框固定纵横比
          aspectRatio: 1 / 1,
          // 将裁剪框限制在画布的大小
          viewMode: 1,
          // 移动画布，裁剪框不动
          dragMode: 'move',
          // 裁剪框不可移动
          cropBoxMovable: false,
          // 不可以调整裁剪框大小
          cropBoxResizable: false,
        }
  );
};

// init modal
const initModal = async (modalData_: ModalData) => {
  modalData.value = modalData_;
  visible.value = true;

  // 等待 dom 渲染完成
  await nextTick();

  initCropper();
};

// 上传图片
const handleConfirm = async () => {
  if (!modalData.value || !cropper) {
    return;
  }

  const file = await new Promise<File | null>((resolve) => {
    cropper?.getCroppedCanvas().toBlob((blob) => {
      if (blob) {
        resolve(
          new File([blob], modalData.value?.file.name || '', {
            type: modalData.value?.file.type,
          })
        );
      }
      resolve(null);
    });
  });

  if (!file) {
    return;
  }

  try {
    // 将图片上传到服务器
    const result = await uploadFile({
      file,
    });

    if (result.status !== '200') {
      throw new Error(`未知 status: ${result.status}`);
    }

    // 更新用户信息参数
    const values = {
      avatar: 'xxx',
    };

    // 更新用户信息
    const result2 = await updateProfile(values);

    if (result2.status !== '200') {
      throw new Error(`未知 status: ${result2.status}`);
    }

    // 获取用户信息
    const result3 = await getUserInfo();

    // 模拟头像已经更新成功
    result3.data.avatar = URL.createObjectURL(file);

    if (result.status !== '200') {
      throw new Error(`未知 status: ${result3.status}`);
    }

    accountStore.updateUserInfo(result3.data);

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
  }
};

// define expose
defineExpose({
  initModal,
});
</script>

<template>
  <Modal
    v-model:visible="visible"
    width="500px"
    title="裁剪头像"
    cancelText="取消"
    confirmText="保存"
    :onConfirm="handleConfirm"
  >
    <div v-if="modalData && imgSrc" class="flex justify-center items-start py-2">
      <img ref="imgRef" :src="imgSrc" class="max-w-full object-contain" />
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
@import './AvatarDetailModal.scss';
</style>
