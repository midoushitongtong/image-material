import type { ImageMaterialDetail, ImageMaterialListItem } from './types';

// image material list
export const getImageMaterialList = async (params: {
  pageNumber: number;
  pageSize: number;
  categoryId?: string;
  keyword?: string;
}): Promise<{
  status: string;
  data: ImageMaterialListItem[];
  total: number;
}> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 100));

  return Promise.resolve({
    status: '200',
    data: [
      {
        tags: ['all', 'pets', 'web_app_icon', 'illustration', 'anime'],
        photo:
          'https://images.pexels.com/photos/8771023/pexels-photo-8771023.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@79786369',
        avatar:
          'https://images.pexels.com/users/avatars/79786369/-702.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Никита Семехин',
        photoDownLink: 'https://www.pexels.com/photo/8771023/download/',
        id: '8771023',
        title: '1图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 750,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'modeling_hair', 'web_app_icon', 'cars_motorcycles', 'anime', 'travel_places'],
        photo:
          'https://images.pexels.com/photos/10808067/pexels-photo-10808067.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@fotios-photos',
        avatar:
          'https://images.pexels.com/users/avatars/26735/lisa-fotios-617.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Lisa Fotios',
        photoDownLink: 'https://www.pexels.com/photo/10808067/download/',
        id: '10808067',
        title: '2图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 609,
        photoType: 'jpg',
      },
      {
        tags: [
          'all',
          'kids',
          'travel_places',
          'web_app_icon',
          'diy_crafts',
          'film_music_books',
          'architecture',
        ],
        photo:
          'https://images.pexels.com/photos/10818461/pexels-photo-10818461.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@fotios-photos',
        avatar:
          'https://images.pexels.com/users/avatars/26735/lisa-fotios-617.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Lisa Fotios',
        photoDownLink: 'https://www.pexels.com/photo/10818461/download/',
        id: '10818461',
        title: '3图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 603,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'illustration', 'pets', 'education', 'home', 'wedding_events', 'web_app_icon'],
        photo:
          'https://images.pexels.com/photos/10320658/pexels-photo-10320658.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@yfshoot',
        avatar:
          'https://images.pexels.com/users/avatars/72154611/furuya-yusuke-823.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Yusuke Furuya',
        photoDownLink: 'https://www.pexels.com/photo/10320658/download/',
        id: '10320658',
        title: '4图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 750,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'web_app_icon', 'architecture', 'games', 'home', 'modeling_hair', 'tips'],
        photo:
          'https://images.pexels.com/photos/8744023/pexels-photo-8744023.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@alina-kurson-80193566',
        avatar:
          'https://images.pexels.com/users/avatars/80193566/alina-kurson-977.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Alina Kurson',
        photoDownLink: 'https://www.pexels.com/photo/8744023/download/',
        id: '8744023',
        title: '5图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 574,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'web_app_icon', 'architecture', 'home', 'men'],
        photo:
          'https://images.pexels.com/photos/10227834/pexels-photo-10227834.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@84330351',
        avatar:
          'https://images.pexels.com/users/avatars/84330351/-586.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Ольга Солодилова',
        photoDownLink: 'https://www.pexels.com/photo/10227834/download/',
        id: '10227834',
        title: '6图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 749,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'home', 'illustration', 'beauty', 'web_app_icon', 'wedding_events'],
        photo:
          'https://images.pexels.com/photos/10592630/pexels-photo-10592630.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@phototrackbr',
        avatar:
          'https://images.pexels.com/users/avatars/65881/bruno-abdiel-815.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Bruno Abdiel',
        photoDownLink: 'https://www.pexels.com/photo/10592630/download/',
        id: '10592630',
        title: '7图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 750,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'games', 'diy_crafts', 'anime', 'home', 'web_app_icon', 'apparel'],
        photo:
          'https://images.pexels.com/photos/11125092/pexels-photo-11125092.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@svetlana-125804098',
        avatar:
          'https://images.pexels.com/users/avatars/125804098/pexels-user-212.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Svetlana🎞',
        photoDownLink: 'https://www.pexels.com/photo/11125092/download/',
        id: '11125092',
        title: '8图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 688,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'geek', 'pets', 'illustration', 'web_app_icon', 'art', 'wedding_events'],
        photo:
          'https://images.pexels.com/photos/8850944/pexels-photo-8850944.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@kseniya-kopna-52379050',
        avatar:
          'https://images.pexels.com/users/avatars/52379050/kseniya-kopna-502.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Kseniya Kopna',
        photoDownLink: 'https://www.pexels.com/photo/8850944/download/',
        id: '8850944',
        title: '9图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 625,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'cars_motorcycles', 'wedding_events', 'film_music_books', 'web_app_icon', 'home'],
        photo:
          'https://images.pexels.com/photos/9351585/pexels-photo-9351585.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@henriquemorais',
        avatar:
          'https://images.pexels.com/users/avatars/1906596/henrique-morais-127.png?auto=compress&fit=crop&h=60&w=60',
        author: 'Henrique Morais',
        photoDownLink: 'https://www.pexels.com/photo/9351585/download/',
        id: '9351585',
        title: '10图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 625,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'web_app_icon', 'wedding_events', 'home'],
        photo:
          'https://images.pexels.com/photos/6216764/pexels-photo-6216764.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@edson-de-assis-2993025',
        avatar:
          'https://images.pexels.com/users/avatars/3122367/diana-995.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Edson de Assis',
        photoDownLink: 'https://www.pexels.com/photo/6216764/download/',
        id: '6216764',
        title: '11图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 751,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'industrial_design', 'geek', 'web_app_icon'],
        photo:
          'https://images.pexels.com/photos/6414007/pexels-photo-6414007.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@anna-pyshniuk-2453945',
        avatar:
          'https://images.pexels.com/users/avatars/2453945/anna-pyshniuk-956.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Anna Pyshniuk',
        photoDownLink: 'https://www.pexels.com/photo/6414007/download/',
        id: '6414007',
        title: '12图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 750,
        photoType: 'jpg',
      },
      {
        tags: [
          'all',
          'education',
          'desire',
          'web_app_icon',
          'quotes',
          'cars_motorcycles',
          'people',
          'wedding_events',
        ],
        photo:
          'https://images.pexels.com/photos/10533155/pexels-photo-10533155.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@mustafa-o-150601384',
        avatar:
          'https://images.pexels.com/users/avatars/3122367/diana-995.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Mustafa O.',
        photoDownLink: 'https://www.pexels.com/photo/10533155/download/',
        id: '10533155',
        title: '13图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 667,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'web_app_icon', 'kids', 'film_music_books', 'education', 'industrial_design'],
        photo:
          'https://images.pexels.com/photos/10980216/pexels-photo-10980216.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@sashmere',
        avatar:
          'https://images.pexels.com/users/avatars/1396426/sasha-prasastika-757.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Sasha Prasastika',
        photoDownLink: 'https://www.pexels.com/photo/10980216/download/',
        id: '10980216',
        title: '14图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 625,
        photoType: 'jpg',
      },
      {
        tags: [
          'all',
          'men',
          'data_presentation',
          'pets',
          'web_app_icon',
          'modeling_hair',
          'industrial_design',
        ],
        photo:
          'https://images.pexels.com/photos/10919343/pexels-photo-10919343.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@rizkysabriansyah',
        avatar:
          'https://images.pexels.com/users/avatars/46443521/rizky-sabriansyah-539.png?auto=compress&fit=crop&h=60&w=60',
        author: 'Rizky Sabriansyah',
        photoDownLink: 'https://www.pexels.com/photo/10919343/download/',
        id: '10919343',
        title: '15图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 750,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'education', 'people', 'web_app_icon', 'apparel'],
        photo:
          'https://images.pexels.com/photos/10162407/pexels-photo-10162407.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@kristina-chuprina-132621985',
        avatar:
          'https://images.pexels.com/users/avatars/132621985/kristina-chuprina-518.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Kristina Chuprina',
        photoDownLink: 'https://www.pexels.com/photo/10162407/download/',
        id: '10162407',
        title: '16图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 755,
        photoType: 'jpg',
      },
      {
        tags: [
          'all',
          'modeling_hair',
          'industrial_design',
          'diy_crafts',
          'web_app_icon',
          'illustration',
        ],
        photo:
          'https://images.pexels.com/photos/10474243/pexels-photo-10474243.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@svetlana-125804098',
        avatar:
          'https://images.pexels.com/users/avatars/125804098/pexels-user-212.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Svetlana🎞',
        photoDownLink: 'https://www.pexels.com/photo/10474243/download/',
        id: '10474243',
        title: '17图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 645,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'web_app_icon', 'beauty', 'cars_motorcycles', 'illustration', 'film_music_books'],
        photo:
          'https://images.pexels.com/photos/7296711/pexels-photo-7296711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@dreamcatchlight',
        avatar:
          'https://images.pexels.com/users/avatars/3122367/diana-995.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Diana Akhmetianova',
        photoDownLink: 'https://www.pexels.com/photo/7296711/download/',
        id: '7296711',
        title: '18图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 750,
        photoType: 'jpg',
      },
      {
        tags: [
          'all',
          'anime',
          'photography',
          'industrial_design',
          'quotes',
          'funny',
          'web_app_icon',
          'games',
        ],
        photo:
          'https://images.pexels.com/photos/11031074/pexels-photo-11031074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@kira-schwarz',
        avatar:
          'https://images.pexels.com/users/avatars/3122367/diana-995.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'kira schwarz',
        photoDownLink: 'https://www.pexels.com/photo/11031074/download/',
        id: '11031074',
        title: '19图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 667,
        photoType: 'jpg',
      },
      {
        tags: ['all', 'beauty', 'games', 'home', 'web_app_icon', 'modeling_hair', 'art'],
        photo:
          'https://images.pexels.com/photos/10589531/pexels-photo-10589531.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        authorLike: 'https://www.pexels.com/zh-cn/@mh92',
        avatar:
          'https://images.pexels.com/users/avatars/1861858/nguyen-hung-226.jpeg?auto=compress&fit=crop&h=60&w=60',
        author: 'Nguyen Hung',
        photoDownLink: 'https://www.pexels.com/photo/10589531/download/',
        id: '10589531',
        title: '20图片数据来自 pexels ',
        photoWidth: 500,
        photoHeight: 750,
        photoType: 'jpg',
      },
    ],
    total: 100,
  });
};

// image material detail
export const getImageMaterialDetail = async (params: {
  id: string;
}): Promise<{
  status: string;
  data: ImageMaterialDetail;
}> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 100));
  const list = await getImageMaterialList({
    pageNumber: 0,
    pageSize: 0,
  });

  return Promise.resolve({
    status: '200',
    data: list.data.find((item) => item.id === params.id) as ImageMaterialDetail,
  });
};
