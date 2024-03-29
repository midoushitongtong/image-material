<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import type { ImageMaterialCategoryListItem } from '@/apis/image-material-category/types';
import { ref } from 'vue';
import SVGIcon from '../svg-icon/SVGIcon.vue';

// modla data
type ModalData = {
  imageMaterialCategoryList: ImageMaterialCategoryListItem[];
  activeCategoryId: string;
  onCategoryListItemClick: (_id: string) => void;
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
    <div v-if="modalData" class="h-[80vh] flex flex-col">
      <div class="flex items-center">
        <h2 class="flex-1 text-base text-zinc-900 dark:text-zinc-200 font-bold px-1">所有分类</h2>
        <div
          class="flex items-center justify-center w-[50px] h-[50px] active:bg-zinc-200"
          @click="visible = false"
        >
          <SVGIcon class="w-2 h-2" name="close" fillClass="fill-zinc-900 dark:fill-znc-200" />
        </div>
      </div>
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
