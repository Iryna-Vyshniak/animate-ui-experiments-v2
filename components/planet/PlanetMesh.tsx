'use client';
import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { IPlanet } from '@/types/planet';
import Ring from './Ring';

const PlanetMesh = ({ planet }: { planet: IPlanet }) => {
  const texturePath = typeof planet.texture === 'string' ? planet.texture : planet.texture.day;
  const texture = useLoader(THREE.TextureLoader, texturePath);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  return (
    // Обгортаємо і планету, і кільце в одну групу і застосовуємо масштабування до групи,
    // щоб обидва елементи масштабувалися однаково.
    <group scale={[3, 3, 3]}>
      {/* Planet */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[window.innerWidth < 768 ? 0.35 : 0.75, 32, 32]} />{' '}
        {/* ✅ Оптимізація */}
        <meshStandardMaterial map={texture} bumpScale={0.05} roughness={1} metalness={1} />
      </mesh>
      {planet.hasRings && planet.ringTexture && (
        // Тут передаємо базовий радіус 1, тому що сфера створена з радіусом 1,
        // а групове масштабування зробить їх ефективними.
        <Ring radius={1} texture={planet.ringTexture} />
      )}
    </group>
  );
};

export default PlanetMesh;
