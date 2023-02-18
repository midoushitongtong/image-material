import type { UserInfo } from './types';

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
    },
  });
};
