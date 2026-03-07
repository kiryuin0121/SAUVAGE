import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'

type Props = any;
const Bubble = ({ position, speed, scale }:Props) => {
  const meshRef = useRef<any>(null);

  // アニメーションフレームごとに実行される関数
  useFrame((state) => {
    if (meshRef.current) {
      // 泡を上に移動させる(Y軸方向)
      meshRef.current.position.y += speed;
      
      // 泡が画面上部に到達したら、下に戻す(ループさせる)
      if (meshRef.current.position.y > 5) {
        meshRef.current.position.y = -5;
      }
      
      // state.clock.elapsedTimeは経過時間を取得
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime + position[1]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 32]} />
      <meshPhongMaterial
        color="#ffffff"
        transparent={true}
        opacity={0.1}
        shininess={100}
      />
    </mesh>
  );
};

export default Bubble;