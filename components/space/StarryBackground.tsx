'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const StarryBackground = ({ reverse = false }: { reverse?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Геометрія зірок
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const starsCount = window.innerWidth < 768 ? 3000 : 10000;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2000;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Матеріал зірок
  const starsMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: reverse ? 0.35 : 0.7, // Робимо ближчі зірки більшими
        transparent: true,
        opacity: reverse ? 0.6 : 0.9, // Додаємо глибину через прозорість
      }),
    [reverse]
  );

  // Обертання у протилежних напрямках
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += reverse ? -0.0003 : 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={starsGeometry} material={starsMaterial} />
    </group>
  );
};

export default StarryBackground;
