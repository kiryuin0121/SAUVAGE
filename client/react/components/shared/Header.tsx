
import { AnimatePresence, motion } from "motion/react";
// icon
import { RiShoppingBag4Line } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import Navigation from "./Navigation";
import { useAtom } from "jotai";
import { modalAtom } from "../../atoms/modal";
import Modal from "./Modal";
import { useCart } from "../../hooks/useCart";

//💻TODO:検索機能、マイページ機能💻
const Header = () => {
  const pathname = location.pathname;
 
  const [activeModal, setActiveModal] = useAtom(modalAtom);
  const { totalQuantity } = useCart();

  const toggleModal = (
    type: "navigation" | "favoriteList" | "shoppingCart" | null
  ) => {
    setActiveModal((prev) => (prev === type ? null : type));
  };

  return (
    <header
      className={`fixed top-0 left-0 z-20 w-screen h-fit flex items-center justify-between bg-neutral-150 px-10 py-5 
    ${
      pathname !== "/"
        ? "text-neutral-950 bg-neutral-100/50"
        : "text-neutral-100"
    }
    `}
    >
      <button
        onClick={() => toggleModal("navigation")}
        type="button"
        className="space-y-2 cursor-pointer  relative z-22"
      >
        <div className="bg-current w-5 h-0.5"></div>
        <div className="bg-current w-5 h-0.5"></div>
      </button>

      <h1 className="absolute left-1/2 -translate-x-1/2 font-playfair text-[36px] tracking-tight z-22">
        {pathname !== "/" ? (
          "Dior"
        ) : (
          ""
        )}
      </h1>

      <ul className="flex items-center justify-center gap-x-10">
        <li className="cursor-not-allowed relative z-22">
          <button>
            <RiSearchLine size={20} className="cursor-not-allowed" />
          </button>
        </li>
        <li className="cursor-not-allowed relative z-22">
          <button>
            <AiOutlineUser size={20} className="cursor-not-allowed" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="cursor-pointer relative z-22"
            onClick={() => toggleModal("favoriteList")}
          >
            <FiHeart size={20} />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="cursor-pointer relative z-22 "
            onClick={() => toggleModal("shoppingCart")}
          >
            <RiShoppingBag4Line size={21} />

            <AnimatePresence>
              {totalQuantity > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 ,transition: { delay: 0.25 }}}
                  exit={{ scale: 0, opacity: 0, transition: { delay: 0.25 } }}
                  className={`
          absolute -top-1 -right-1 
          w-4 max-w-4.5 aspect-square px-1
          flex items-center justify-center overflow-hidden
          text-[10px] font-bold rounded-full shadow-sm
          ${
            pathname !== "/"
              ? "bg-neutral-950 text-white"
              : "bg-white text-neutral-950"
          }
        `}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={totalQuantity}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {totalQuantity}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </li>
      </ul>

      {activeModal === "navigation" && <Navigation />}
      {(activeModal === "favoriteList" || activeModal === "shoppingCart") && (
        <Modal content={activeModal} />
      )}
    </header>
  );
};

export default Header;
