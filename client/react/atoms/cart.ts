import { atom } from "jotai";

export type CartItem = {
  productId:number; //商品id
  volumeId:number; //商品id(容量ごと)
  thumbnailUrl:string;
  name:string;
  price:number;
  volume:number; //容量
  quantity:number; //購入個数
}

/**
 * LocalStorageからカートの中身を取得する関数
 */
const getCart = ():CartItem[] => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("shoppingCart");
  return cart ? JSON.parse(cart) : [];
}

/**
 * カートの中身(globalState)
 */
export const cartAtom = atom<CartItem[]>(getCart());

/**
 * カート更新関数
 */
export const updateCart = atom(
  null,
  (_, set, updater: (prev: CartItem[]) => CartItem[]) => {
    set(cartAtom, (prev) => {
      const newCart = updater(prev);
      localStorage.setItem("shoppingCart", JSON.stringify(newCart));
      return newCart;
    });
  }
);
