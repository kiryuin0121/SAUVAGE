import { useEffect, useState } from "react";
import { useProduct } from "../../../hooks/useProduct";
import { useFavorite } from "../../../hooks/useFavorite";
import { FiHeart, FiChevronDown, FiX } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import Slider from "./Slider";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { reviewListAtom } from "../../../atoms/review";
import { useCart } from "../../../hooks/useCart";
import { motion, AnimatePresence } from "motion/react";
import { modalAtom } from "../../../atoms/modal";

const ProductDetail = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const productId = Number(searchParams.get("productId"));
  // console.log(productId);ok
  const { product, reviews, hasError, isLoading } = useProduct(productId);
  // console.log(product);ok
  const { checkFavoriteList, addFavoriteList, removeFavoriteList } =
    useFavorite();
  const { addCart } = useCart();
  const setReview = useSetAtom(reviewListAtom);

  const [activeItem, setActiveItem] = useState(0);
  const [isProsessing, setIsProsessing] = useState(false); //カート追加処理を実行中か
  const [isAdded, setIsAdded] = useState(false); //追加処理を完了した
  const [activeHeader, setActiveHeader] = useAtom(modalAtom);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-neutral-500">
        商品情報を取得しています・・・
      </div>
    );
  }

  if (hasError || !product) {
    location.href = "/collection";

    return (
      <div className="w-full h-screen flex justify-center items-center text-neutral-500">
        商品情報の取得に失敗しました。
      </div>
    );
  }

  setReview({ averageRating: product.averageRating, reviews });
  const isFavorite = checkFavoriteList(product.id);

  return (
    <section className="w-[90vw] mx-auto mt-[15vh] space-y-20 mb-[10vh]">
      <div className="flex gap-x-20">
        <div className="w-[45%] relative">
          
          <div className="w-full aspect-square bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200">
            <div className="w-full aspect-square overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem}
                  className="absolute inset-0"
                  initial={{ x: "50%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-50%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Slider images={product.volumes[activeItem].images ?? []} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              isFavorite
                ? removeFavoriteList(product.id)
                : addFavoriteList({
                    id: product.id,
                    thumbnailUrl: product.thumbnailUrl,
                    name: product.name,
                    price: product.volumes[activeItem]?.price,
                  });
            }}
            className="absolute top-2 right-2 z-10 p-2 group cursor-pointer"
          >
            <motion.div
              key={isFavorite ? "active" : "inactive"}
              whileTap={{ scale: 0.8 }}
              animate={
                isFavorite
                  ? {
                      scale: [1, 1.3, 1],
                      transition: { duration: 0.3 },
                    }
                  : { scale: 1 }
              }
            >
              <FiHeart
                size={30}
                className={`transition-colors duration-300 ${
                  isFavorite
                    ? "text-rose-600 fill-rose-600"
                    : "text-neutral-400 group-hover:text-neutral-500"
                }`}
              />
            </motion.div>
          </button>
        </div>

        <div className="w-[55%] flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <a href={`/collection#${product.categoryName}`} className="mb-px">
              <h2 className="text-xs tracking-widest text-neutral-500 uppercase cursor-pointer transition-colors  hover:text-neutral-700">
                {product.categoryName}
              </h2>
            </a>
            <h3 className="text-2xl font-medium text-neutral-900">
              {product.name}
            </h3>

            <a href="#customer-review" className="flex items-center gap-2 pt-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <AiFillStar
                    key={idx}
                    size={14}
                    className={
                      idx < Math.round(product.averageRating)
                        ? "text-neutral-800"
                        : "text-neutral-200"
                    }
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 text-[13px] text-neutral-400">
                <span>({reviews.length})</span>
                <FiChevronDown size={12} />
              </div>
            </a>
          </div>

          <p className="text-sm text-neutral-500 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4 py-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Intensity
            </span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-sm ${
                    idx < (product.intensity ?? 0)
                      ? "bg-neutral-800"
                      : "bg-neutral-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Size
            </p>
            <ul className="flex flex-wrap gap-2">
              {product.volumes.map((item, idx) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveItem(idx)}
                    className={`px-6 py-2 rounded-xl border text-sm transition-all cursor-pointer
                      ${
                        activeItem === idx
                          ? "border-neutral-800 bg-neutral-800 text-white"
                          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
                      }`}
                  >
                    {item.volume}ml
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <button
              type="button"
              disabled={isProsessing}
              className={`w-full rounded-xl p-4 flex items-center justify-between text-neutral-100 transition-colors
                ${isProsessing ? "bg-neutral-800 cursor-not-allowed" : "bg-neutral-900 hover:bg-neutral-800 cursor-pointer"}
                `}
              onClick={() => {
                setIsProsessing(true);
                let processId: number;
                let modalTimerId: number;
                processId = setTimeout(() => {
                  setIsProsessing(false);
                  setIsAdded(true);
                  modalTimerId = setTimeout(() => {
                    setIsAdded(false);
                    clearTimeout(modalTimerId);
                  }, 4000);
                  clearTimeout(processId);
                }, 1200);
                addCart({
                  productId: product.id,
                  volumeId: product.volumes[activeItem]?.id,
                  thumbnailUrl: product.thumbnailUrl,
                  name: product.name,
                  price: product.volumes[activeItem]?.price,
                  volume: product.volumes[activeItem]?.volume,
                });
              }}
            >
              {isProsessing ? (
                <div className="h-5 aspect-square border-4 border-neutral-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                <>
                  <span className="text-sm font-medium">
                    ショッピングバッグに追加
                  </span>
                  <span className="text-sm font-bold flex items-center w-fit">
                    ￥
                    <span className="relative inline-block h-5 min-w-[3em] overflow-hidden ml-1">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={activeItem}
                          initial={{ y: "50%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "-50%", opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: "easeInOut",
                          }}
                          className="absolute left-0 top-0 whitespace-nowrap"
                        >
                          {product.volumes[activeItem]?.price.toLocaleString()}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <section className="px-5">
        <h3 className="text-lg font-medium mb-6 text-neutral-900">
          製品の詳細
        </h3>
        <div className="text-sm text-neutral-600 leading-loose ">
          <p className="whitespace-pre-wrap">{product.detail}</p>
        </div>
      </section>

      {/* モーダル */}
      <AnimatePresence>
        {isAdded && activeHeader === null && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setActiveHeader("shoppingCart")}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-50 w-[50vw] bg-white transition-colors hover:bg-neutral-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-300 rounded-sm flex items-center p-4  group overflow-hidden"
          >
            {/* サムネイル */}
            <figure className="w-12 aspect-square bg-neutral-300 shrink-0 overflow-hidden">
              <img
                src={product.thumbnailUrl}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </figure>

            {/* テキスト情報 */}
            <div className="ml-6 grow tracking-wide">
              <span className="block text-[10px] tracking-[0.2em] font-bold uppercase text-neutral-400 mb-0.5">
                Added to bag
              </span>
              <div className="flex items-baseline gap-3">
                <h4 className="text-[13px] font-medium text-neutral-900">
                  {product.name}
                </h4>
                <span className="text-[11px] text-neutral-400">
                  {product.volumes[activeItem]?.volume}ml
                </span>
              </div>
            </div>

            {/* 閉じるボタン */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAdded(false);
              }}
              className="ml-6 p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <FiX size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductDetail;
