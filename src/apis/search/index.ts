import type { SearchHintListItem } from './types';

// search hint list
export const getSearchHintList = async (params: {
  searchKeyword?: string;
}): Promise<{
  status: string;
  data: SearchHintListItem[];
}> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 100));

  return Promise.resolve({
    status: '200',
    data: [
      { keyword: `${params.searchKeyword}-1` },
      { keyword: `${params.searchKeyword}-2` },
      { keyword: `${params.searchKeyword}-3` },
      { keyword: `${params.searchKeyword}-4` },
      { keyword: `${params.searchKeyword}-5` },
      { keyword: `${params.searchKeyword}-6` },
      { keyword: `${params.searchKeyword}-7` },
      { keyword: `${params.searchKeyword}-8` },
      { keyword: `${params.searchKeyword}-9` },
      { keyword: `${params.searchKeyword}-10` },
      { keyword: `${params.searchKeyword}-11` },
    ],
    total: 100,
  });
};
