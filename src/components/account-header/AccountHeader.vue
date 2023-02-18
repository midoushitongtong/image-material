<script setup lang="ts"></script>

<template>
  <!-- 电脑端: 头部 -->
  <div class="py-5 mobile:hidden">
    <img src="@/assets/images/logo.jpg" class="m-auto w-5 h-5" />
  </div>
  <!-- 手机端: 头部 -->
  <div class="pc-and-tablet:hidden relative h-[111px]">
    <img src="@/assets/images/sign-in-bg.png" class="dark:hidden w-full h-full object-cover" />
    <img
      src="@/assets/images/logo.jpg"
      class="w-5 h-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './AccountHeader.scss'; ;
</style>
