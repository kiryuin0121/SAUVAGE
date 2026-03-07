import { Canvas, useFrame } from "@react-three/fiber";
import Bubbles from "./Bubbles";
import Sauvage from "./Sauvage";
import { Environment, Scroll } from "@react-three/drei";
import { ScrollControls } from "@react-three/drei";
import { motion } from "motion/react";
import ProductSlider from "./ProductSlider";
import Video from "./Video";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";

const Content = () => {
  return (
    <section className="sticky top-0 left-0 z-10 h-screen w-screen mt-[100vh] text-neutral-100 bg-navy">
      {/* 3D領域 */}
      <Canvas gl={{ toneMappingExposure: 0.7 }}>
        <ScrollControls pages={10}>
          {/* ----------照明・3Dモデル---------- */}
          {/* 照明 */}
          <ambientLight intensity={0.5} />
          <Environment preset="studio" environmentIntensity={0.5} />
          {/* 香水の3dモデル */}
          <Sauvage />
          {/* 背面の気泡オブジェクト群 */}
          <Bubbles />
          {/* ----------HTML(合計10画面分スクロール可能)---------- */}
          <Scroll html>
            <div className="w-screen h-fit">
              {/* -----画面1~9----- */}
              <div className="w-screen px-[5vw] h-fit">
                {/* ファーストビュー */}
                <Section1 />

                {/* シリーズコンセプト*/}
                <Section2 />

                {/* ボトルのデザイン */}
                <Section3 />

                {/* 画像・動画*/}
                <figure className="h-screen w-full relative">
                  {/* 左上 */}
                  <img
                    src="/assets/images/sauvage-water.jpg"
                    alt=""
                    className="left-0 top-0 w-80 -translate-y-52 -translate-x-4"
                  />
                  {/* 右下 */}
                  <img
                    src="/assets/images/lavender.webp"
                    alt=""
                    className="absolute top-0 right-0 z-11 h-72 translate-y-1/4"
                  />
                  <video
                    src="/assets/movies/first-view.mp4"
                    autoPlay
                    loop
                    muted
                    className="absolute bottom-0 right-0 h-56 aspect-video translate-x-8 -translate-y-40"
                  />
                </figure>

                {/* 香料*/}
                <Section4 />

                {/* 持続時間 */}
                <Section5 />

                {/* フレーズ */}
                <section className="h-screen w-full relative flex items-center justify-center">
                  <motion.div
                    className="max-w-2xl text-center space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <h3 className="text-3xl font-light tracking-[0.4em] uppercase italick">
                      powerful, yet noble
                    </h3>
                    <p className="text-sm leading-relaxed tracking-widest font-light text-neutral-200">
                      In the wild, <br />
                      everything is always in front of you.
                    </p>

                    <p className="pt-4 text-[13px] text-neutral-300 tracking-widest font-light">
                      本能を解き放て
                    </p>
                  </motion.div>
                </section>
              </div>

              {/* -----画面10 */}
              <section className="h-screen w-screen overflow-y-scroll overflow-x-hidden no-scrollbar">
                <div className="h-fit">
                  {/* -----調香師の言葉----- */}
                  <section className="w-full min-h-screen flex flex-col items-center justify-center gap-y-16 bg-navy pt-[50vh]">
                    <h2 className="text-lg font-light tracking-[0.5em] uppercase text-neutral-400">
                      Words of perhumer
                    </h2>
                    <Video />
                  </section>

                  {/* -----商品リンク------ */}
                  <section className="w-full min-h-screen bg-navy flex flex-col justify-center items-center gap-y-8 py-60">
                    <ProductSlider />
                  </section>

                  {/* フッター */}
                  <footer className="w-screen bg-navy py-8 flex justify-center">
                    <p className="text-[10px] tracking-[.5em] text-neutral-600 uppercase">
                      © 2026 ohs50348
                    </p>
                  </footer>
                </div>
              </section>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
      <button
        type="button"
        className="fixed bottom-8 right-8 z-11 border-b border-current"
      >
        <a href="/collection">Shop Now</a>
      </button>
    </section>
  );
};

export default Content;
