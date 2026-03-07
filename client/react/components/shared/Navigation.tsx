import { AnimatePresence, motion, type Variants } from "motion/react";
import { useAtomValue, useSetAtom } from "jotai";
import { modalAtom } from "../../atoms/modal";

const categories = [
  { name: "Fragrance", href: "/collection#fragrances" },
  { name: "Skincare", href: "/collection#skincare" },
  { name: "Bath & Shaving", href: "/collection#bathShavings" },
  { name: "Gift Sets", href: "/collection#giftSets" },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const Navigation = () => {
  const activeModal = useAtomValue(modalAtom);
  const setActiveModal = useSetAtom(modalAtom);

  return (
    <AnimatePresence>
      {activeModal === "navigation" && (
        <>
          <motion.div
            className="fixed inset-0 z-10 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          />

          <motion.nav
            className="fixed left-0 top-20 z-20 w-[46vw] h-[72vh] rounded-xl bg-neutral-100 text-neutral-950 border border-neutral-300"
            initial={{ x: 0, opacity: 0.5 }}
            animate={{ x: 48, opacity: 1 }}
            exit={{ x: 0, opacity: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full grid grid-cols-[1.1fr_0.9fr]">
              <div className="relative border-r border-neutral-300 flex flex-col">
                <div className="px-10 pt-8">
                  <p className="text-[11px] tracking-[0.4em] uppercase text-neutral-400">
                    Dior
                  </p>
                  <h2 className="text-[12px] tracking-[0.35em] uppercase text-neutral-900 mt-1">
                    Sauvage
                  </h2>
                </div>

                <div className="flex-1 flex items-center justify-center px-10">
                  <img
                    src="/assets/images/100edp.webp"
                    alt="Dior Sauvage"
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="px-10 pb-8">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400">
                    Christian Dior Parfums
                  </p>
                </div>
              </div>

              <motion.ul
                className="flex flex-col justify-center px-14"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {categories.map((c) => (
                  <motion.li
                    key={c.name}
                    variants={item}
                    className="border-b border-neutral-200 last:border-none"
                  >
                    <a
                      href={c.href}
                      onClick={() => setActiveModal(null)}
                      className="group block py-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] tracking-[0.32em] uppercase text-neutral-400 transition-colors duration-300 group-hover:text-neutral-900">
                          {c.name}
                        </span>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
