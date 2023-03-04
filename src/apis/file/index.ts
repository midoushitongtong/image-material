export const uploadFile = async (
  params: any
): Promise<{
  status: string;
}> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 100));

  return Promise.resolve({
    status: '200',
  });
};
