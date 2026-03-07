import React, { useMemo } from "react";
import Bubble from "./Bubble";
/**
 * 気泡を複数個生成する
 */
const Bubbles = () => {
  const bubbles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        key: `left-${i}`,
        position: [
          -2.5 - Math.random() * 5, // X
          Math.random() * 10 - 5, // Y
          Math.random() * 2 - 1, // Z
        ],
        speed: 0.01 + Math.random() * 0.05, // 上昇速度
        scale: 0.02 + Math.random() * 0.06, // 泡のおおきさ
      });
    }

    for (let i = 0; i < 50; i++) {
      temp.push({
        key: `right-${i}`,
        position: [
          2.5 + Math.random() * 5, // X座標
          Math.random() * 10 - 5, // Y座標
          Math.random() * 2 - 1, // Z座標
        ],
        speed: 0.01 + Math.random() * 0.05,
        scale: 0.02 + Math.random() * 0.06,
      });
    }
    return temp;
  }, []);

  return (
    <>
      {bubbles.map((bubble: any) => (
        <Bubble
          key={bubble.key}
          position={bubble.position}
          speed={bubble.speed}
          scale={bubble.scale}
        />
      ))}
    </>
  );
};

export default Bubbles;
