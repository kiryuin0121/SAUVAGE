import React from "react";

/**
 *ファーストビュー
 */
const Section1 = () => {
  return (
    <section className="h-screen w-full relative z-10">
      {/* ブランドロゴ */}
      <h2 className="absolute top-1/2 left-1/2 z-11 -translate-1/2 h-30">
        <img
          src="/assets/images/SAUVAGE.png"
          alt="Sauvage"
          className="invert-25 h-full"
        />
      </h2>

      {/* やまｐ */}
      <img
        src="/assets/images/yama-p.webp"
        alt=""
        className="w-[38vw] absolute bottom-[10%] right-8 rounded-sm shadow-2xl"
      />
    </section>
  );
};

export default Section1;
