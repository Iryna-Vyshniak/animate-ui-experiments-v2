'use client';

import React, { Suspense } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { OrbitControls, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { IPlanet } from '@/types/planet';

import CelestialBody from './CelestialBody';
import Sun from '../space/Sun';
import OrbitLine from '../space/OrbitLine';
import { useLayoutNavigationStore } from '@/store/layoutNavigationStore';
import SceneStars from '../space/SceneStars';
import { useLayoutNavigationController } from '@/hooks/useLayoutNavigationController';

interface GalacticViewProps {
  planets: IPlanet[];
}

const GalacticView: React.FC<GalacticViewProps> = ({ planets }) => {
  // Глобальний стан для обраної планети (для OrbitControls)
  const { followedPlanet } = useLayoutNavigationStore();
  const { isOpenModal } = useLayoutNavigationController();

  const galacticSpring = useSpring({
    opacity: isOpenModal ? 0 : 1,
    scale: isOpenModal ? 0 : 1,
    config: { mass: 2, tension: 150, friction: 25 },
  });

  return (
    <animated.div style={galacticSpring} className='relative inset-0 w-screen h-screen'>
      <Canvas
        shadows
        className='fixed inset-0 w-screen h-screen'
        camera={{
          fov: 60, // Кут огляду камери (Field of View) – 60 градусів
          position: [-80, 50, 100], // Початкова позиція камери в 3D-просторі
        }}
        dpr={[1, 2]} // Налаштування Device Pixel Ratio: підтримка масштабування від 1 до 2 (для різних дисплеїв, зокрема Retina)
        gl={{
          antialias: false, // Вимикаємо антиаліасинг для потенційного покращення продуктивності
          preserveDrawingBuffer: true, // Зберігаємо буфер малювання, що може бути корисним для збереження скріншотів або пост-обробки
        }}
      >
        {/* Якщо обрана планета, додаємо OrbitControls для обертання навколо неї */}
        {followedPlanet && (
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.05}
            enablePan={true}
            enableZoom={true}
            minPolarAngle={Math.PI / 2.1}
            maxPolarAngle={Math.PI / 2.1}
          />
        )}

        <Suspense fallback='loading'>
          <SceneStars />
          <group rotation={[Math.PI / 4, 0, 0]}>
            <Sun />
            {planets.map((planet) => (
              <group key={planet.name}>
                <OrbitLine radius={planet.orbitRadius} />
                <CelestialBody key={planet.name} planet={planet} />
              </group>
            ))}
          </group>

          <ambientLight intensity={0.5} />
          <directionalLight position={[50, 50, 50]} intensity={1.2} />
          <pointLight position={[0, 0, 0]} intensity={2} />
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            minDistance={80}
            maxDistance={800}
            autoRotate
            autoRotateSpeed={0.05}
            minPolarAngle={Math.PI / 4} // Дозволяє більший кут нахилу
            maxPolarAngle={Math.PI / 1.5}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </animated.div>
  );
};

export default GalacticView;
