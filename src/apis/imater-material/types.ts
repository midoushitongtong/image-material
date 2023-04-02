// image material list item
export type ImageMaterialListItem = {
  id: string;
  author: string;
  authorLike: string;
  avatar: string;
  photo: string;
  photoDownLink: string;
  photoHeight: number;
  photoType: string;
  photoWidth: number;
  tags: string[];
  title: string;
};

// image material detail
export type ImageMaterialDetail = ImageMaterialListItem;
