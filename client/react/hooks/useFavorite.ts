import { useAtomValue, useSetAtom } from "jotai";
import { Favorite, favoritesAtom, updateFavorites } from "../atoms/favorite";

/**
 * お気に入りリストを管理するカスタムフック
 *@returns favoriteList お気に入りリスト
 *@returns checkFavoriteList 商品がお気に入りリストに存在するか確かめる関数
 *@returns addFavoriteList 商品をお気に入りリストに追加する関数
 *@returns deleteFavoriteList 商品をお気に入りリストから削除する関数
 */
export const useFavorite = () => {
  const favoriteList = useAtomValue(favoritesAtom); //お気に入りリスト
  const setFavorites = useSetAtom(updateFavorites); //お気に入りリスト更新用関数

  /**
   *商品がお気に入りリストに存在するか確かめる関数
   *@returns お気に入りリストに存在するか否かの真偽値
   */
  const checkFavoriteList = (itemId: number) =>
    favoriteList.some((f) => f.id === itemId);

  /**
   *お気に入りリストに商品を追加する関数
   */
  const addFavoriteList = (item: Favorite) => {
    // 商品がリストに存在しない場合のみ追加処理を行う。
    checkFavoriteList(item.id) === false &&
      setFavorites([...favoriteList, item]);
  };

  /**
   *お気に入りリストから商品を削除する関数
   */
  const removeFavoriteList = (itemId: number) => {
    setFavorites(favoriteList.filter((f) => f.id !== itemId));
  };

  return {
    favoriteList,
    checkFavoriteList,
    addFavoriteList,
    removeFavoriteList,
  };
};
