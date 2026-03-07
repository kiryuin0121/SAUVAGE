import { atom } from "jotai";
import { Review } from "../types/product";
type ReviewList = {
  averageRating: number;
  reviews: Review[];
};
export const reviewListAtom = atom<ReviewList>({
  averageRating: 0,
  reviews: [],
});
