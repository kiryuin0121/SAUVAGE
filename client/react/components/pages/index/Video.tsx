import React, { useRef, useState } from "react";
import RevealAnimation from "../../shared/RevealAnimation";
import { motion, AnimatePresence } from "motion/react";

function Video() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <RevealAnimation>
      <motion.figure
        layout
        initial={{ width: "60vw", borderRadius: 12 }}
        animate={{
          width: isPlaying ? "75vw" : "50vw",
          borderRadius: isPlaying ? 0 : 12,
          boxShadow: isPlaying
            ? "0 40px 120px rgba(0,0,0,0.6)"
            : "0 10px 30px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-video overflow-hidden"
      >
        {/* video本体 */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="assets/movies/perfumer.mp4"
          controls={isPlaying}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* カバー画像レイヤー */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              className="absolute inset-0 cursor-pointer"
              onClick={handlePlay}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* 画像 */}
              <motion.img
                src="assets/images/perfumer.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />

              {/* 黒グラデ */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-black/30" />

              {/* 再生ボタン */}
              <motion.div
                className="absolute inset-0 grid place-items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-20 aspect-square rounded-full bg-navy/20 backdrop-blur-md grid place-items-center">
                  ▶
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.figure>
    </RevealAnimation>
  );
}

export default Video;
