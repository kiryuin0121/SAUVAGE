import useSWR from "swr";
import { CategoryName, ListGroup, Review } from "../types/product";

// データフェッチ関数
const fetchCategory = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("商品情報の取得に失敗しました");
    return res.json();
  });

// 商品一覧
type Product = {
  id: number;
  thumbnailUrl: string;
  name: string;
  description: string;
  intensity: number;
  minPrice: number;
};
export const useCategory= (categoryId: number) => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/api/categories/${categoryId}`,
    fetchCategory,
  );
  return {
    products: data as Product[],
    isLoading: isLoading || (!data && !error),
    hasError: !!error,
  };
};
