// 商品カテゴリ
export type CategoryName =
  | "fragrances"
  | "skincare"
  | "bathShaving"
  | "giftSets";

// ProductList
export type ListItem = {
  id: number;
  thumbnailUrl: string;
  name: string;
  description: string;
  intensity: number | null;
  minPrice: number;
};

export type ListGroup = {
  category: CategoryName;
  products: ListItem[];
};

// ProductDetail

// 容量ごとの情報
export type Volume = {
  id: number;
  productId: number;
  volume: number;
  price: number;
  images: Image[];
};

export type Image = {
  id: number;
  imageUrl: string;
  volumeId: number;
};

// 商品レビュー
export type Review = {
  id: number;
  productId: number;
  rating: number;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
};

// 商品情報
export type Product = {
  id: number;
  thumbnailUrl: string;
  name: string;
  description: string;
  detail: string;
  intensity: number | null;
  categoryName: CategoryName;
  averageRating: number;
  volumes: Volume[];
};
