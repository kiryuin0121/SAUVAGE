import { FiHeart } from "react-icons/fi";
import { useFavorite } from "../../hooks/useFavorite";
// アニメーション用にmotionをインポート
import { motion, AnimatePresence } from "motion/react";

const FavoriteList = () => {
  const {
    favoriteList,
    checkFavoriteList,
    addFavoriteList,
    removeFavoriteList,
  } = useFavorite();

  if (favoriteList.length === 0) {
    return (
      <div className="text-center leading-[70vh] text-neutral-600 text-sm tracking-wide">
        現在お気に入りに追加された製品はありません。
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col py-5">
      <ul className="flex-1 overflow-y-scroll space-y-4 px-2">
        <AnimatePresence mode="popLayout">
          {favoriteList.map((favorite) => (
            <motion.li
              key={favorite.id}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              layout
            >
              <article
                className="relative flex items-center gap-4 p-3 rounded-xl transition-all duration-250 group hover:bg-neutral-200"
                onClick={() =>
                  (location.href = `/page01?productId=${favorite.id}`)
                }
              >
                <motion.button
                  whileTap={{ scale: 0.7 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    checkFavoriteList(favorite.id)
                      ? removeFavoriteList(favorite.id)
                      : addFavoriteList(favorite);
                  }}
                  className="absolute top-0 right-0 z-10 p-2 cursor-pointer"
                >
                  <FiHeart
                    size={20}
                    className={`transition-colors duration-300 ${
                      checkFavoriteList(favorite.id)
                        ? "text-rose-600 fill-rose-600"
                        : "text-neutral-300 hover:text-neutral-900"
                    }`}
                  />
                </motion.button>

                {/* image */}
                <figure
                  className="bg-neutral-300 w-24 aspect-square shrink-0 rounded-lg overflow-hidden transition-all duration-300 group-hover:brightness-95 bg-cover bg-center"
                  style={{ backgroundImage: `url(${favorite.thumbnailUrl})` }}
                />

                {/* info */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium tracking-wide text-neutral-900 leading-tight">
                    {favorite.name}
                  </h3>
                  <p className="text-xs tracking-wider text-neutral-500">
                    ￥{favorite.price.toLocaleString()}~
                  </p>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default FavoriteList;
