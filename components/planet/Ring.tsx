'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

interface RingProps {
  radius: number; // базовий радіус планети (наприклад, 1 для сфери, створеної з args={[1, 64, 64]})
  texture: string;
}

const Ring: React.FC<RingProps> = ({ radius, texture }) => {
  // Завантаження текстури для кільця
  const ringTexture = useLoader(THREE.TextureLoader, texture);

  // Мемоізація геометрії для уникнення повторних обчислень
  const geometry = useMemo(() => {
    // Зменшуємо коефіцієнти для внутрішнього та зовнішнього радіусів:
    // наприклад, innerRadius = radius * 1.1, outerRadius = radius * 1.3
    const innerRadius = radius * 1.1;
    const outerRadius = radius * 1.3;
    const geom = new THREE.RingGeometry(innerRadius, outerRadius, 64);

    // Налаштовуємо UV-координати (опціонально, якщо потрібно коригувати відображення текстури)
    const pos = geom.attributes.position;
    const v3 = new THREE.Vector3();
    const mid = (innerRadius + outerRadius) / 2;
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      // Простий підхід: якщо відстань від центру менша за середнє значення, то uv.x = 0, інакше = 1
      geom.attributes.uv.setXY(i, v3.length() < mid ? 0 : 1, 1);
    }
    return geom;
  }, [radius]);

  return (
    // При потребі можна змінити значення rotation, щоб кільце коректно розташовувалося відносно планети
    <mesh rotation={[Math.PI / 1.5 - 0.5, 0.2, 0]}>
      <primitive object={geometry} attach='geometry' />
      <meshBasicMaterial map={ringTexture} transparent side={THREE.DoubleSide} attach='material' />
    </mesh>
  );
};

export default Ring;
