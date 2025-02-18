import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { IPlanet } from '@/types/planet';
import PlanetMesh from './PlanetMesh';
import SceneStars from '../space/SceneStars';

const Planet3D = ({
  planet,
  onView,
  isModal,
}: {
  planet: IPlanet;
  onView?: () => void;
  isModal?: boolean;
}) => {
  return (
    <Canvas shadows className='canvas' onClick={onView} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={'loading'}>
        {onView && (
          <>
            <SceneStars />
            <SceneStars reverse />
          </>
        )}
        <PlanetMesh planet={planet} isModal={isModal} />

        <OrbitControls
          autoRotate
          autoRotateSpeed={planet.rotationSpeed}
          enablePan
          enableZoom
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 2.1}
        />

        {/* Основне сонячне світло з помірною інтенсивністю */}
        <directionalLight
          intensity={2.0}
          position={[5, 0, 0]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* AmbientLight – заповнює всю сцену, роблячи темну сторону не занадто темною */}
        <ambientLight intensity={0.5} />

        {/* HemisphereLight для м'якого градієнтного освітлення */}
        <hemisphereLight args={['#ffffff', '#222222', 0.7]} position={[0, 20, 0]} />

        <pointLight position={[0, 0, 0]} intensity={1.5} decay={2} distance={50} />
      </Suspense>
    </Canvas>
  );
};

export default Planet3D;
