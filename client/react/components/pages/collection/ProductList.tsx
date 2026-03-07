import { FiHeart } from "react-icons/fi";
import { useAllProducts } from "../../../hooks/useProduct";
import { useFavorite } from "../../../hooks/useFavorite";
import { useEffect } from "react";
import { motion, type Variants } from "motion/react";

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ProductList = () => {
  const { categories, isLoading, hasError } = useAllProducts();
  const { checkFavoriteList, addFavoriteList, removeFavoriteList } =
    useFavorite();

  useEffect(() => {
    if (location.hash && !isLoading) {
      const categoryElement = document.querySelector(`${location.hash}`);
      categoryElement?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isLoading]);

  if (isLoading)
    return (
      <div className="w-full min-h-[90vh] flex justify-center items-center">
        商品情報を取得しています・・・
      </div>
    );

  if (hasError && !categories)
    return (
      <div className="w-full min-h-[90vh] flex justify-center items-center">
        商品情報の取得に失敗しました。
      </div>
    );

  return (
    <ul className="w-[90vw] min-h-screen mx-auto space-y-40">
      {categories.map((group, idx) => (
        <li key={idx}>
          <section id={group.category} className="space-y-10">
            <h2 className="text-center text-xl tracking-widest uppercase text-neutral-600">
              {group.category}
            </h2>

            <motion.ul
              className="grid grid-cols-3 gap-x-6 gap-y-10 justify-center"
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {group.products.map((product) => (
                <motion.li key={product.id} variants={itemVariants}>
                  <article
                    onClick={() =>
                      (window.location.href = `/page01?productId=${product.id}`)
                    }
                    className="relative border border-neutral-200 bg-neutral-100 rounded-xl transition-colors duration-300 hover:bg-neutral-200 group flex flex-col h-full"
                  >
                    {/* image */}
                    <figure className="relative w-full aspect-square rounded-t-xl overflow-hidden bg-neutral-100 shrink-0">
                      {product.thumbnailUrl ? (
                        <motion.img
                          src={product.thumbnailUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      ) : (
                        <div className="bg-neutral-300 w-full h-full" />
                      )}

                      {/* お気に入りボタン */}
                      <motion.button
                        whileTap={{ scale: 0.7 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          checkFavoriteList(product.id)
                            ? removeFavoriteList(product.id)
                            : addFavoriteList({
                                id: product.id,
                                thumbnailUrl: product.thumbnailUrl,
                                name: product.name,
                                price: product.minPrice,
                              });
                        }}
                        className="absolute top-3 right-3 z-10 cursor-pointer p-1"
                      >
                        <motion.div
                          key={
                            checkFavoriteList(product.id) ? "active" : "inactive"
                          }
                          animate={
                            checkFavoriteList(product.id)
                              ? { scale: [1, 1.4, 1] }
                              : { scale: 1 }
                          }
                          transition={{ duration: 0.3 }}
                        >
                          <FiHeart
                            size={25}
                            className={`transition-colors ${
                              checkFavoriteList(product.id)
                                ? "text-rose-600 fill-rose-600"
                                : "text-neutral-400 hover:text-neutral-600"
                            }`}
                          />
                        </motion.div>
                      </motion.button>
                    </figure>

                    {/* body */}
                    <div className="px-4 py-3 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm  font-medium tracking-wide line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-neutral-500 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, idx) => {
                            const isActive = idx < (product.intensity ?? 0);
                            return (
                              <span
                                key={idx}
                                className={`w-2 h-2 rounded-sm ${
                                  isActive ? "bg-neutral-800" : "bg-neutral-300"
                                }`}
                              />
                            );
                          })}
                        </div>

                        <p className="text-sm font-medium">
                          ￥{product.minPrice.toLocaleString()}～
                        </p>
                      </div>
                    </div>
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          </section>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
