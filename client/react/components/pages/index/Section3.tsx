import { motion } from "motion/react";
/**
 *容器のデザイン
 */
const Section3 = () => {
  return (
    <section className="h-[200vh] w-full">
      {/*  デザインの特徴その１*/}
      <div className="h-1/2 w-full relative">
        <div className="absolute top-1/4 left-1/5 -translate-1/2 text-sm w-1/4">
          <h2 className="font-bold tracking-[0.2em] uppercase text-[10px] mb-3 text-neutral-400">
            Deepblue Gradient
          </h2>
          <p className="leading-relaxed font-light tracking-wide">
            Blue-to-black gradient inspired by the desert sky at "magic hour".
          </p>
          <p className="mt-4 text-[13px] text-neutral-600 tracking-widest">
            マジックアワーから着想を得た深い青のグラデーション
          </p>
        </div>
      </div>

      {/*  デザインの特徴その２*/}
      <div className="h-1/2 w-full relative">
        <motion.div
          className="absolute top-0 right-1/5 translate-x-3/4 text-sm w-1/4"
          initial={{ opacity: 0, y: "100%" }}
          whileInView={{ opacity: 1, y: "0%" }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true, margin: "-60% 0px -40% 0px" }}
        >
          <h2 className="font-bold tracking-[0.2em] uppercase text-[10px] mb-3 text-neutral-400">
            Weighted Grass Bottle
          </h2>
          <p className="font-light leading-relaxed tracking-wide">
            A heavy glass cylinder that combines strength with refinement.
          </p>

          <p className="mt-5 text-[13px] text-neutral-600 tracking-widest">
            力強さと洗練された印象を与えるボトル
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Section3;
