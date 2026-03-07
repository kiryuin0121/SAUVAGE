"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "motion/react";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { useCategory } from "../../../hooks/useCategory";

const ProductSlider = () => {
  const { products, isLoading, hasError } = useCategory(1);
  const [activeIndex, setActiveIndex] = useState(1);

  if (isLoading)
    return <div className="text-sm text-neutral-400">Loading...</div>;
  if (hasError || !products)
    return <div className="text-sm text-neutral-400">Failed to load.</div>;

  return (
    <section className="relative w-full max-w-300 mx-auto">
      {/* ===== Swiper ===== */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
        centeredSlides
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
        className="w-full relative"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <a href={`/page01?productId=${product.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group"
              >
                <figure className="w-full aspect-square overflow-hidden rounded-sm bg-black">
                  <motion.img
                    src={product.thumbnailUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </figure>

                <div className="mt-4 space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                    Dior Sauvage
                  </p>

                  <p className="text-sm tracking-[0.15em] font-light">
                    {product.name}
                  </p>

                  <p className="text-[11px] tracking-widest text-neutral-400">
                    ￥{product.minPrice}〜
                  </p>

                </div>
              </motion.article>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[12px] tracking-[0.45em] text-neutral-600">
        <div className="relative h-5 w-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute left-0 top-0 text-neutral-300"
            >
              {String(activeIndex).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        <span >/</span>

        <span>
          {String(products.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
};

export default ProductSlider;
