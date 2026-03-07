import { useAtomValue } from "jotai";
import { reviewListAtom } from "../../../atoms/review";
import { AiFillStar } from "react-icons/ai";
import { format } from "date-fns";
import { motion } from "motion/react";
const ReviewList = () => {
  const reviewList = useAtomValue(reviewListAtom);

  return (
    <div
      id="review"
      className="w-[90vw] mx-auto flex flex-col items-center mb-[5vh]"
    >
      <div className="w-[70vw] mx-auto flex justify-center items-center border-b border-neutral-200 my-10">
        <div className="flex items-center gap-4 py-8">
          <span className="text-xl font-medium text-neutral-900">
            {reviewList.averageRating?.toFixed(1)}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <AiFillStar
                key={i}
                size={18}
                className={
                  i < Math.round(reviewList.averageRating)
                    ? "text-neutral-800"
                    : "text-neutral-200"
                }
              />
            ))}
          </div>
          <span className="text-sm text-neutral-400">
            {reviewList.reviews.length}件のレビュー
          </span>
        </div>
      </div>

      <ul className="w-[70vw] mx-auto divide-y divide-neutral-100">
        {reviewList.reviews.length > 0 ? (
          reviewList.reviews.map((review) => (
            <li key={review.id} className="py-12 border-b border-neutral-200">
              <div className="flex flex-col space-y-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "text-neutral-800"
                              : "text-neutral-200"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm font-bold text-neutral-900 tracking-wide">
                      {review.authorName}様
                    </p>
                  </div>
                  <p className="text-xs text-neutral-400 tabular-nums">
                    {format(new Date(review.createdAt), "yyyy-MM-dd")}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-neutral-900">
                    {review.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-light">
                    {review.content}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center py-12 text-sm text-neutral-600 leading-relaxed font-light">
            まだこの商品にレビューは行われていません。
          </li>
        )}
      </ul>
    </div>
  );
};

export default ReviewList;
