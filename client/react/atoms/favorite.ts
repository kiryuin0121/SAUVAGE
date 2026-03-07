import { atom } from "jotai";

export type Favorite = {
  id: number;
  thumbnailUrl: string;
  name: string;
  price: number;
};

/**
 * localStrageからお気に入りリストを取得する関数
*/
const getFavorites = (): Favorite[] => {
  const favorites = localStorage.getItem("favoriteList");
  return favorites ? JSON.parse(favorites) : [];
};

/**
 *お気に入りリスト(globalState)
*/
export const favoritesAtom = atom<Favorite[]>(getFavorites());

/**
 *お気に入りリスト更新関数
*/
export const updateFavorites = atom(
  null,
  (_, set, newFavorites: Favorite[]) => {
    // 新しいお気に入りリストをglobalStateに反映させる。
    set(favoritesAtom, newFavorites);
    // ,,をlocalStrageにも反映させる。
    localStorage.setItem("favoriteList", JSON.stringify(newFavorites));
  }
);
