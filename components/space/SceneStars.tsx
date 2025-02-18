'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SceneStars = ({ reverse = false }: { reverse?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Геометрія зірок
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const starsCount = window.innerWidth < 768 ? 5000 : 10000;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 1) {
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
        size: reverse ? 0.25 : 0.35, // Робимо ближчі зірки більшими
        transparent: true,
        opacity: reverse ? 0.6 : 0.9, // Додаємо глибину через прозорість
        depthWrite: false, // Запобігає затемненню зірок
        sizeAttenuation: true, // Масштабування за відстанню
        blending: THREE.AdditiveBlending, // Додає ефект світіння
        alphaTest: 0.5, // Фільтрує чорний фон (імітація круглого краю)
      }),
    [reverse]
  );

  // Обертання у протилежних напрямках
  // delta — передає час (у секундах), що минув з моменту останнього кадру. delta каже, скільки часу пройшло між кадрами анімації. Він використовується для гладкої та незалежної від FPS анімації.
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += reverse ? delta * -0.0003 : delta * 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={starsGeometry} material={starsMaterial} />
    </group>
  );
};

export default SceneStars;
