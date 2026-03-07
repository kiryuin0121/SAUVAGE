import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
// motionをインポート
import { motion, AnimatePresence } from "motion/react";

const ShoppingCart = () => {
  const { totalPrice, cart, removeCart, changeQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center leading-[70vh] text-neutral-600 text-sm tracking-wide">
        現在ショッピングバッグに追加された製品はありません。
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* list */}
      <ul className="flex-1 overflow-y-auto space-y-4 py-5 px-2">
        <AnimatePresence mode="popLayout">
          {cart.map((item) => (
            <motion.li
              key={item.volumeId}
              layout
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            >
              <article
                className="relative flex items-center gap-4 p-3 rounded-xl transition-all duration-250 group hover:bg-neutral-200"
                onClick={() =>
                  (location.href = `/page01?productId=${item.productId}`)
                }
              >
                {/* remove */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCart(item.volumeId);
                  }}
                  className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-900 transition cursor-pointer z-10"
                >
                  <div className="p-2">
                    <FiX size={16} />
                  </div>
                </button>

                {/* image */}
                <figure
                  className="bg-neutral-300 w-24 aspect-square shrink-0 rounded-lg overflow-hidden transition-all duration-300 group-hover:brightness-95 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.thumbnailUrl})` }}
                />

                {/* info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1 pr-6">
                    <h3 className="text-sm font-medium tracking-wide text-neutral-900 leading-snug">
                      {item.name}
                    </h3>

                    {/* volume & price */}
                    <div className="flex items-center gap-3 text-xs tracking-wider text-neutral-500">
                      <span>{item.volume}ml</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    {/* quantity */}
                    <div className="flex items-center gap-1 border border-neutral-300 bg-neutral-50 rounded-xl px-1 py-0.5">
                      <button
                        disabled={item.quantity === 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          changeQuantity(item.volumeId, item.quantity - 1);
                        }}
                        className={`transition cursor-pointer p-1.5 ${
                          item.quantity === 1
                            ? "text-neutral-200 "
                            : "text-neutral-500 hover:text-neutral-900"
                        }`}
                      >
                        <FiMinus size={12} />
                      </button>

                      <span className="text-xs min-w-4 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeQuantity(item.volumeId, item.quantity + 1);
                        }}
                        className="text-neutral-500 hover:text-neutral-900 transition cursor-pointer p-1.5"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>

                    {/* subtotal */}
                    <p className="text-sm font-medium tracking-wide text-neutral-900">
                      ￥{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* footer */}
      <div className="border-y border-neutral-300 p-4 bg-neutral-100 rounded-b-xl">
        <button
          disabled
          className="
            w-full bg-neutral-900 text-white rounded-xl py-4 px-6
            flex justify-between items-center
            hover:bg-neutral-800 transition-colors
            cursor-not-allowed
          "
        >
          <span className="text-sm font-medium">購入手続きに進む</span>

          <span className="text-sm font-bold flex items-center w-fit">
            ￥
            <span className="h-5 min-w-[4em] overflow-hidden ml-1 relative">
              <AnimatePresence>
                <motion.span
                  key={totalPrice}
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-50%", opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-0 whitespace-nowrap"
                >
                  {totalPrice.toLocaleString()}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
