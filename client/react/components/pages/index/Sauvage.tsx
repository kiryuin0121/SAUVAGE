import { useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Sauvage = () => {
  // 3dモデルを読み込む
  const gltf = useLoader(GLTFLoader, "/assets/models/sauvage/scene.gltf");
  const modelRef = useRef<THREE.Group>(null); //
  const wrapperRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // アニメーションの定義
  useFrame(() => {
    if (!modelRef.current || !wrapperRef.current) return;
    const scrollY = scroll.offset;

    let rotationY = 0;
    let rotationZ = 0;
    let positionX = 0;
    let positionZ = -0.5;

    // 回転しながら近づく
    if (scrollY <= 0.1) {
      const progress = scrollY / 0.1;
      rotationY = Math.PI * progress;
      positionZ = -0.5 + 0.5 * progress;
    } else if (scrollY <= 0.125) {
      rotationY = Math.PI;
      positionZ = 0;
    }
    // さらに近づく
    else if (scrollY <= 0.2) {
      const progress = (scrollY - 0.125) / (0.2 - 0.125);
      rotationY = Math.PI;
      positionZ = 0 + 1.2 * progress;
    }
    // 一時停止
    else if (scrollY <= 0.275) {
      rotationY = Math.PI;
      positionZ = 1.2;
    }
    // 自転する
    else if (scrollY <= 0.3) {
      const progress = (scrollY - 0.275) / (0.3 - 0.275);
      rotationY = Math.PI + 2 * Math.PI * progress;
      positionZ = 1.2;
    }
    // 一時停止
    else if (scrollY <= 0.325) {
      rotationY = Math.PI * 3;
      positionZ = 1.2;
    }
    // 螺旋運動
    else if (scrollY > 0.325 && scrollY <= 0.5) {
      const progress = (scrollY - 0.325) / (0.5 - 0.325);
      positionX = 3 * Math.sin(progress * Math.PI * 2) * 0.5;
      rotationZ = (Math.PI / 6) * progress;
      // wrapperRef.current.rotation.z = (Math.PI / 6) * progress;
      rotationY = Math.PI * 3 + progress * Math.PI * 2;
      positionZ = 1 - 1 * progress;
    }
    // 一時停止
    else if (scrollY > 0.5 && scrollY <= 0.54) {
      rotationY = Math.PI * 5;
      rotationZ = Math.PI / 6;
      positionX = 0;
      positionZ = 0;
    }
    // 自転する
    else if (scrollY > 0.54 && scrollY <= 0.56) {
      const progress = (scrollY - 0.54) / (0.56 - 0.54);
      rotationY = Math.PI * 5 + Math.PI * 2 * progress;
      rotationZ = Math.PI / 6;
      positionX = 0;
      positionZ = 0;
    }
    // 停止
    else if (scrollY > 0.56 && scrollY <= 0.65) {
      rotationY = Math.PI * 7;
      rotationZ = Math.PI / 6;
      positionX = 0;
      positionZ = 0;
    }
    // z軸の傾きを戻す
    else if (scrollY > 0.65 && scrollY <= 0.7) {
      const progress = (scrollY - 0.65) / (0.7 - 0.65);
      rotationZ = Math.PI / 6 - (Math.PI / 6) * progress;
      rotationY = Math.PI * 7; 
      positionX = 0;
      positionZ = 0;
    }
    // ゆっくり回転しながら位置を維持
    else if (scrollY > 0.7 && scrollY <= 0.75) {
      const progress = (scrollY - 0.7) / (0.75 - 0.7);
      rotationY = Math.PI * 7 + Math.PI * 0.6 * progress;
      rotationZ = 0;
      positionX = 0;
      positionZ = 0;
    }
    // 正面を向きながら大きく手前に近づく
    else if (scrollY > 0.75 && scrollY <= 0.82) {
      const progress = (scrollY - 0.75) / (0.82 - 0.75);
      positionX = 0;
      positionZ = 1 * progress;
      rotationY = Math.PI * 7.6 + Math.PI * 0.9 * progress;
      rotationZ = 0;
    }
    // 正面でゆっくり回転しながら鑑賞
    else if (scrollY > 0.82 && scrollY <= 0.86) {
      const progress = (scrollY - 0.82) / (0.86 - 0.82);
      positionX = 0;
      positionZ = 1;
      rotationY = Math.PI * 8.5 + Math.PI * 0.4 * progress;
      rotationZ = 0;
    }
    // 回転しながら傾ける
    else if (scrollY > 0.86 && scrollY <= 0.91) {
      const progress = (scrollY - 0.86) / (0.91 - 0.86);
      positionX = 0;
      positionZ = 1;
      rotationY = Math.PI * 8.9 + Math.PI * 1.1 * progress;
      rotationZ = (-Math.PI / 10) * progress;
    }
    // 遠ざかりながら傾きを戻し、回転を続ける
    else if (scrollY > 0.91) {
      const progress = Math.min((scrollY - 0.91) / 0.09, 1);
      positionX = 0;
      positionZ = 1 - 5 * progress; 
      rotationY = Math.PI * 10 + Math.PI * 4 * progress;
      rotationZ = (-Math.PI / 10) * (1 - progress);
    }

    wrapperRef.current.rotation.z = rotationZ;
    // 値の適用
    modelRef.current.position.x = positionX;
    modelRef.current.position.z = positionZ;
    modelRef.current.rotation.y = rotationY;
  });

  return (
    <group ref={wrapperRef}>
      <group ref={modelRef}>
        <primitive object={gltf.scene} scale={20} />
      </group>
    </group>
  );
};

export default Sauvage;
