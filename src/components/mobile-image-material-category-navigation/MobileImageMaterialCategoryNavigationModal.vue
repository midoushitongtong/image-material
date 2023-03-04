<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import type { ImageMaterialCategoryListItem } from '@/apis/image-material-category/types';
import { ref } from 'vue';

// modla data
type ModalData = {
  imageMaterialCategoryList: ImageMaterialCategoryListItem[];
  activeCategoryId: string;
  // eslint-disable-next-line no-unused-vars
  onCategoryListItemClick: (id: string) => void;
};

// visible
const visible = ref(false);
// modal data
const modalData = ref<ModalData | undefined>(undefined);

// init modal
const initModal = (modalData_: ModalData) => {
  modalData.value = modalData_;
  visible.value = true;
};

// define expose
defineExpose({
  initModal,
});
</script>

<template>
  <Modal
    v-model:visible="visible"
    width="100vw"
    containerClass="mobile-image-material-category-navigation-modal"
  >
    <div v-if="modalData" class="pt-2 h-[80vh] flex flex-col">
      <h2 class="text-base text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">所有分类</h2>
      <div class="overflow-y-auto pb-2">
        <div
          v-for="item of modalData.imageMaterialCategoryList"
          :key="item.id"
          :class="[
            'text-sm text-zinc-600 dark:text-zinc-300 px-1 py-1.5 duration-100 active:text-zinc-100 active:bg-zinc-900',
            item.id === modalData.activeCategoryId &&
              'font-bold text-zinc-100 bg-zinc-900 dark:bg-zinc-800',
          ]"
          @click="
            () => {
              modalData?.onCategoryListItemClick(item.id);
              visible = false;
            }
          "
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
@import './MobileImageMaterialCategoryNavigationModal.scss';
</style>

<style lang="scss">
.mobile-image-material-category-navigation-modal {
  .content-container {
    top: auto;
    bottom: 0;
    .content-inner-container {
      border-radius: 0;
      max-width: 100vw;
      max-height: 100vh;
      padding: 0;
      border-width: 0;
    }
  }
}
</style>
