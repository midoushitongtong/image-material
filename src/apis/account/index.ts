import type { UserInfo } from './types';
import logo from '@/assets/images/logo.jpg';

// sign in
export const signIn = async (
  params: any
): Promise<{
  status: string;
  data: {
    accessToken: string;
  };
}> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return Promise.resolve({
    status: '200',
    data: {
      accessToken: 'hello world',
    },
  });
};

// sign up
export const signUp = async (
  params: any
): Promise<{
  status: string;
  data: {
    accessToken: string;
  };
}> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return Promise.resolve({
    status: '200',
    data: {
      accessToken: 'hello world',
    },
  });
};

// user detail
export const getUserInfo = async (): Promise<{
  status: string;
  data: UserInfo;
}> => {
  return Promise.resolve({
    status: '200',
    data: {
      id: '1',
      username: 'XXX用户名',
      avatar: logo,
      company: 'XXX公司',
      title: 'XXX职位',
      homePage: 'XXX个人主页',
      introduction: 'XXX个人介绍',
    },
  });
};

// update profile
export const updateProfile = async (
  params: any
): Promise<{
  status: string;
}> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return Promise.resolve({
    status: '200',
  });
};
