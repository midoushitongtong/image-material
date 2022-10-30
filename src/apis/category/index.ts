import type { CategoryListItem } from './types';

// category list
export const getCategoryList = async (): Promise<{
  status: string;
  data: CategoryListItem[];
}> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return Promise.resolve({
    status: '200',
    data: [
      { id: 'web_app_icon', name: 'UI/UX' },
      { id: 'design', name: '平面' },
      { id: 'illustration', name: '插画/漫画' },
      { id: 'photography', name: '摄影' },
      { id: 'games', name: '游戏' },
      { id: 'anime', name: '动漫' },
      { id: 'industrial_design', name: '工业设计' },
      { id: 'architecture', name: '建筑设计' },
      { id: 'art', name: '人文艺术' },
      { id: 'home', name: '家居/家装' },
      { id: 'apparel', name: '女装/搭配' },
      { id: 'men', name: '男士/风尚' },
      { id: 'modeling_hair', name: '造型/美妆' },
      { id: 'diy_crafts', name: '手工/布艺' },
      { id: 'food_drink', name: '美食' },
      { id: 'travel_places', name: '旅行' },
      { id: 'wedding_events', name: '婚礼' },
      { id: 'kids', name: '儿童' },
      { id: 'pets', name: '宠物' },
      { id: 'quotes', name: '美图' },
      { id: 'people', name: '明星' },
      { id: 'beauty', name: '美女' },
      { id: 'desire', name: '礼物' },
      { id: 'geek', name: '极客' },
      { id: 'data_presentation', name: '数据图' },
      { id: 'cars_motorcycles', name: '汽车/摩托' },
      { id: 'film_music_books', name: '电影/图书' },
      { id: 'tips', name: '生活百科' },
      { id: 'education', name: '教育' },
      { id: 'sports', name: '运动' },
      { id: 'funny', name: '搞笑' },
    ],
  });
};
