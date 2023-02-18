import type { UserInfo } from '@/apis/account/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '@/router';

const useAccountStore = defineStore('account', () => {
  // ==================================================
  // state
  // ==================================================
  // accessToken
  const accessToken = ref<string | undefined>(localStorage.getItem('accessToken') || undefined);
  // userInfo
  const userInfo = ref<UserInfo | undefined>(undefined);

  // ==================================================
  // actions
  // ==================================================
  const updateAccessToken = (accessToken_: typeof accessToken.value) => {
    accessToken.value = accessToken_;
    if (accessToken.value) {
      localStorage.setItem('accessToken', accessToken.value);
    } else {
      localStorage.removeItem('accessToken');
    }
  };
  const updateUserInfo = (userInfo_: typeof userInfo.value) => {
    userInfo.value = userInfo_;
  };
  const signOut = () => {
    updateAccessToken(undefined);
    updateUserInfo(undefined);
  };

  return {
    userInfo,
    updateUserInfo,
    updateAccessToken,
    accessToken,
    signOut,
  };
});

export { useAccountStore };
