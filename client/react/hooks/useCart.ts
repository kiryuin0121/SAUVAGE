import { useAtomValue, useSetAtom } from "jotai";
import { cartAtom, CartItem, updateCart } from "../atoms/cart";

export const useCart = () => {
  const cart = useAtomValue(cartAtom); //カートの内容
  const setCart = useSetAtom(updateCart); //カート更新用関数

  /**
   * 商品がカートに追加済みかを検証する関数
   * @params volumeId 商品id(容量ごと)
   */
  const checkCart = (volumeId: number) => {
    return cart.some((i) => i.volumeId === volumeId);
  };

  /**
   * 商品をカートに追加する関数
   */
  const addCart = (targetItem: Omit<CartItem, "quantity">) => {
    setCart((cart) => {
      // 商品がカートに追加済みであれば該当商品の購入数を1つ増やす。
      if (cart.some((i) => i.volumeId === targetItem.volumeId)) {
        return cart.map((item) =>
          item.volumeId === targetItem.volumeId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // そうでない場合は、該当商品の購入数を1とする。
      return [...cart, { ...targetItem, quantity: 1 }];
    });
  };

  /**
   * 商品をカートから削除する関数
   */
  const removeCart = (volumeId: number) => {
    setCart((cart) => cart.filter((item) => item.volumeId !== volumeId));
  };

  /**
   * 商品の購入数を変更する関数
   * @params volumeId 商品id(容量ごと)
   * @params quantity 購入数
   */
  const changeQuantity = (volumeId: number, quantity: number) => {
    setCart((cart) => {
      // 購入数が0以下の場合は商品をカートから削除する。
      if (quantity <= 0) {
        return cart.filter((item) => item.volumeId !== volumeId);
      }

      // そうでない場合は、該当商品の購入数に指定された数値を設定する。
      return cart.map((item) =>
        item.volumeId === volumeId ? { ...item, quantity } : item
      );
    });
  };

  /**
   *カートに入っている商品の個数
  */
  const totalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {
    totalPrice,
    cart,
    checkCart,
    addCart,
    removeCart,
    changeQuantity,
    totalQuantity
  };
};
