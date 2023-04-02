import type { MembershipPlanOrderStatus } from './types';

// create membership plan order
export const createMembershipPlanOrder = async (params: {
  membershipPlanId: string;
}): Promise<{
  status: string;
  data: {
    id: string;
    alipayPayUrl: string;
  };
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return Promise.resolve({
    status: '200',
    data: {
      id: '123',
      alipayPayUrl: '123',
    },
  });
};

// membership plan order status
export const getMembershipPlanOrderStatus = async (params: {
  orderId: string;
}): Promise<{
  status: string;
  data: {
    status: MembershipPlanOrderStatus;
  };
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return Promise.resolve({
    status: '200',
    data: {
      status: 'success',
    },
  });
};
