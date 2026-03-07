import useSWR from "swr";
import { CategoryName, ListGroup, Product, Review } from "../types/product";

// データフェッチ関数
const fetchProduct = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("商品情報の取得に失敗しました");
    return res.json();
  });

// 商品一覧
export const useAllProducts = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8080/api/products",
    fetchProduct
  );
  return {
    categories: data as ListGroup[],
    isLoading: isLoading || (!data && !error),
    hasError: !!error,
  };
};

// 商品詳細
export const useProduct = (productId: number) => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/api/products/${productId}`,
    fetchProduct
  );

  const reviews: Review[] = data?.reviews ?? [];

  const product: Product | null = data
    ? {
        id: data.id,
        thumbnailUrl: data.thumbnailUrl,
        name: data.name,
        description: data.description,
        detail: data.detail,
        intensity: data.intensity,
        categoryName: data.category?.name, 
        averageRating:
          reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1),
        volumes: data.volumes,
      }
    : null;

  return {
    product,
    reviews,
    isLoading: isLoading || (!data && !error),
    hasError: !!error,
  };
};
