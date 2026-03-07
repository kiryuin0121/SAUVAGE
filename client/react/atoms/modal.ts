import {atom} from "jotai";
export const modalAtom = atom<"navigation"|"favoriteList"|"shoppingCart"|null>(null);