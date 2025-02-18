// Sun.tsx
import { Sphere, useTexture, MeshWobbleMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';

const Sun = () => {
  const sunRef = useRef<Mesh>(null);
  const sunTexture = useTexture('/space/textures/sun_.jpg');

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.2; // Обертання Сонця
    }
  });

  return (
    <>
      {/* Візуальне представлення Сонця */}
      <Sphere ref={sunRef} position={[0, 0, 0]} args={[4, 32, 32]}>
        <MeshWobbleMaterial
          map={sunTexture}
          emissive='#FFFF99'
          emissiveIntensity={0.012}
          factor={0.1}
          speed={0.05}
        />
      </Sphere>

      {/* Джерело світла, розміщене трохи зміщеним від центру Сонця */}
      <pointLight
        castShadow
        intensity={3} // Збільшена інтенсивність для кращого ефекту
        position={[2, 0, 0]} // Зміщено, щоб світло не блокувалося геометрією Сонця
        distance={300} // Встановлюємо достатній радіус дії світла
        decay={2}
      />
    </>
  );
};

export default Sun;
