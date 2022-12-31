import { defineStore } from 'pinia';
import { ref } from 'vue';

const useSearchHistoryStore = defineStore('searcHisory', () => {
  // ==================================================
  // state
  // ==================================================
  // 搜索历史
  const searchHistoryList = ref<string[]>(
    localStorage.getItem('searchHistoryList')
      ? JSON.parse(localStorage.getItem('searchHistoryList') as string)
      : []
  );

  // ==================================================
  // actions
  // ==================================================
  // 更新搜索历史
  const updateSearchHistoryList = (searchHistoryList_: typeof searchHistoryList.value) => {
    searchHistoryList.value = searchHistoryList_;
    // 保存数据到 localStorage 中
    localStorage.setItem('searchHistoryList', JSON.stringify(searchHistoryList.value));
  };

  // 添加搜索历史
  const addSearchHistory = (searchHistory: string) => {
    // 临时数据
    let searchHistoryListTemp = searchHistoryList.value;
    // 是否已存在列表中
    const findIndex = searchHistoryListTemp.findIndex((item) => item === searchHistory);
    // 删除旧数据
    if (findIndex !== -1) {
      searchHistoryListTemp = searchHistoryListTemp.filter((item) => item !== searchHistory);
    }
    // 添加新数据
    searchHistoryListTemp = [searchHistory, ...searchHistoryListTemp];
    // 保存数据
    updateSearchHistoryList(searchHistoryListTemp);
  };

  // 删除搜索历史
  const deleteSearchHistory = (searchHistory: string) => {
    // 临时数据
    let searchHistoryListTemp = searchHistoryList.value;
    // 删除数据
    searchHistoryListTemp = searchHistoryList.value.filter((item) => item !== searchHistory);
    // 保存数据
    updateSearchHistoryList(searchHistoryListTemp);
  };

  // 删除全部搜索历史
  const deleteAllSearchHistory = () => {
    // 保存数据
    updateSearchHistoryList([]);
  };

  return {
    searchHistoryList,
    addSearchHistory,
    deleteSearchHistory,
    deleteAllSearchHistory,
  };
});

export { useSearchHistoryStore };
