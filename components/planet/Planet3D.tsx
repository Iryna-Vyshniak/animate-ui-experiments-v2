import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { IPlanet } from '@/types/planet';
import PlanetMesh from './PlanetMesh';
import StarryBackground from '../space/StarryBackground';

const Planet3D = ({ planet, onView }: { planet: IPlanet; onView?: () => void }) => {
  return (
    <Canvas shadows className='canvas' onClick={onView}>
      <Suspense fallback={'loading'}>
        {onView && <StarryBackground />}
        <PlanetMesh planet={planet} />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={planet.rotationSpeed}
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 2.1}
        maxPolarAngle={Math.PI / 2.1}
      />

      {/* Основне сонячне світло з помірною інтенсивністю */}
      <directionalLight
        intensity={2.0}
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* AmbientLight – заповнює всю сцену, роблячи темну сторону не занадто темною */}
      <ambientLight intensity={0.8} />

      {/* HemisphereLight для м'якого градієнтного освітлення */}
      <hemisphereLight args={['#ffffff', '#222222', 0.7]} position={[0, 20, 0]} />
    </Canvas>
  );
};

export default Planet3D;
