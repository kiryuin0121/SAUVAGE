import { useState } from "react";
import FavoriteList from "./FavoriteList";
import ShoppingCart from "./ShoppingCart";
import { AnimatePresence, motion } from "motion/react";
import { useAtomValue, useSetAtom } from "jotai";
import { modalAtom } from "../../atoms/modal";

const Modal = ({ content }: { content: "favoriteList" | "shoppingCart" }) => {
  const activeModal = useAtomValue(modalAtom);
  const setActiveModal = useSetAtom(modalAtom);

  const [activeContent, setActiveContent] = useState<
    "favoriteList" | "shoppingCart"
  >(content);

  return (
    <AnimatePresence>
      {activeModal !== null && (
        <>
          <motion.div
            className="fixed inset-0 z-10 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          />

          <motion.div
            className="fixed right-0 top-20 z-20 w-1/4 h-3/4 bg-neutral-100 text-neutral-950 rounded-xl border border-neutral-300"
            initial={{ x: 0, opacity: 0.5 }}
            animate={{ x: -48, opacity: 1 }}
            exit={{ x: 0, opacity: 0.5 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <ul className="relative h-[5vh] flex items-center border-b border-neutral-300">
              <li
                onClick={() => setActiveContent("favoriteList")}
                className={`w-1/2 flex justify-center py-2   cursor-pointer transition-all duration-200
                  ${
                    activeContent === "favoriteList"
                      ? "text-black"
                      : "text-neutral-600"
                  }
                `}
              >
                お気に入り
              </li>

              <li
                onClick={() => setActiveContent("shoppingCart")}
                className={`text-sm w-1/2 flex justify-center py-2 cursor-pointer transition-all duration-200
                  ${
                    activeContent === "shoppingCart"
                      ? "text-black"
                      : "text-neutral-600"
                  }
                `}
              >
                ショッピングバッグ
              </li>

              <motion.div
                className="absolute -bottom-0.5 left-0 h-px z-11 w-1/2 bg-neutral-600"
                animate={{
                  x: activeContent === "favoriteList" ? "0%" : "100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </ul>

            <div className="h-[70vh]">
              {activeContent === "favoriteList" && <FavoriteList />}
              {activeContent === "shoppingCart" && <ShoppingCart />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
