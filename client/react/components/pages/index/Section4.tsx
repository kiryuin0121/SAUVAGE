import { motion } from "motion/react";

/**
 *香料
 */
const Section4 = () => {
  return (
    <section className="h-[200vh] w-full">
      {/* -----香料----- */}
      <ul className="h-screen w-full relative">
        {/* ラベンダー */}
        <motion.li
          className="absolute top-1/4 left-15/100 w-56 float"
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.95,
            filter: "blur(6px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-33% 0px -67% 0px" }}
        >
          <img
            src="/assets/images/scent-lavender.png"
            alt=""
            className="select-none w-56 rotate-y-180! -rotate-z-30!"
          />
          <h4 className="font-semibold tracking-[0.3em] text-center mt-4 uppercase text-xs">
            Fresh Lavender
          </h4>
          <p className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-56 text-[13px] leading-relaxed font-light text-neutral-400 text-center">
            Fresh and aromatic. <br />A signature of sharp, clean energy.
          </p>
        </motion.li>

        {/*ウッディノード、スパイス */}
        <motion.li
          className="absolute bottom-1/4 right-15/100 w-72 float"
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.95,
            filter: "blur(6px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
          viewport={{ once: true, margin: "-67% 0px -33% 0px" }}
        >
          <img
            src="/assets/images/scent-woody.png"
            alt=""
            className="select-none w-72"
          />
          <h4 className="font-semibold tracking-[0.3em] text-center mt-4 uppercase text-xs">
            Woody & Spice
          </h4>
          <p className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-72 text-[13px] leading-relaxed font-light text-neutral-400 text-center">
            Deep and mysterious. <br />A warm, sensual trail that lingers.
          </p>
        </motion.li>
      </ul>

      {/* -----香り----- */}
      <section className="h-screen w-full relative flex flex-col justify-center items-center gap-y-12">
        <motion.h3
          className="text-lg font-light tracking-[0.5em] uppercase text-neutral-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          The Scent Notes
        </motion.h3>

        {/* さんかくかけるさん */}
        <ul className="flex gap-16">
          <motion.li
            className="relative text-center w-50 aspect-square flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.45 }}
          >
            <div className="absolute inset-0 -z-10 flex justify-center items-center">
              <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full stroke-neutral-500 fill-neutral-900/75"
                style={{ strokeWidth: 0.5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.3 }}
              >
                <motion.polygon
                  points="50,15 90,85 10,85"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                    delay: 0,
                  }}
                />
              </motion.svg>
            </div>

            <div className="space-y-2 mt-4">
              <div className="text-[9px] uppercase tracking-[0.4em] text-neutral-400">
                First Note
              </div>
              <p className="text-sm tracking-[0.15em] font-medium">Spices</p>
              <div className="h-px w-6 bg-neutral-700 mx-auto" />
              <p className="text-[11px] text-neutral-400 font-light px-4">
                Vibrant Spice
              </p>
            </div>
          </motion.li>

          <motion.li
            className="relative text-center w-50 aspect-square flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            viewport={{ once: true, amount: 0.45 }}
          >
            <div className="absolute inset-0 -z-10 flex justify-center items-center">
              <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full stroke-neutral-400 fill-neutral-900/80"
                style={{ strokeWidth: 0.5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.3 }}
              >
                <motion.polygon
                  points="50,15 90,85 10,85"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                    delay: 0.12,
                  }}
                />
              </motion.svg>
            </div>

            <div className="space-y-2 mt-4">
              <div className="text-[9px] uppercase tracking-[0.4em] text-neutral-400">
                Heart Note
              </div>
              <p className="text-sm tracking-[0.15em] font-medium">Lavender</p>
              <div className="h-px w-6 bg-neutral-700 mx-auto" />
              <p className="text-[11px] text-neutral-400 font-light px-4">
                Fresh & Sharp
              </p>
            </div>
          </motion.li>

          <motion.li
            className="relative text-center w-50 aspect-square flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            viewport={{ once: true, amount: 0.45 }}
          >
            <div className="absolute inset-0 -z-10 flex justify-center items-center">
              <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full stroke-neutral-500 fill-neutral-900/75"
                style={{ strokeWidth: 0.5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.3 }}
              >
                <motion.polygon
                  points="50,15 90,85 10,85"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                    delay: 0.24,
                  }}
                />
              </motion.svg>
            </div>

            <div className="space-y-2 mt-4">
              <div className="text-[9px] uppercase tracking-[0.4em] text-neutral-400">
                Base Note
              </div>
              <p className="text-sm tracking-[0.15em] font-medium">
                Musk & Woody
              </p>
              <div className="h-px w-6 bg-neutral-700 mx-auto" />
              <p className="text-[11px] text-neutral-400 font-light px-4">
                Noble Wood
              </p>
            </div>
          </motion.li>
        </ul>
      </section>
    </section>
  );
};

export default Section4;
