import React, { ReactNode } from "react";
import { easeInOut, motion } from "motion/react";
const RevealAnimation = ({ children }: { children: ReactNode }) => {
  const variants1 = {
    initila: {
      left: 0,
    },
    animate: {
      left: "100%",
    },
  };
  return (
    <div
      className="relative w-fit overflow-hidden rounded-sm"
    >
      {children}
      <motion.div
        variants={variants1}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="absolute top-0 w-full h-full bg-navy"
        transition={{delay:0.7,duration:0.3,ease:easeInOut}}
      />
    </div>
  );
};

export default RevealAnimation;
