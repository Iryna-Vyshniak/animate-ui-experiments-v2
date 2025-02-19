'use client';
import React, { useRef, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Sphere, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useLayoutNavigationStore, LayoutNavigationState } from '@/store/layoutNavigationStore';

import Ring from './Ring';

import { IPlanet } from '@/types/planet';
import { SLOW_ORBIT_FACTOR } from '@/constants/navigation';

interface PlanetMeshProps {
  planet: IPlanet;
  isModal?: boolean;
}

const PlanetMesh: React.FC<PlanetMeshProps> = ({ planet, isModal }) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  const { hoveredPlanet, setHoveredPlanet, setFollowedPlanet } = useLayoutNavigationStore(
    useShallow((state: LayoutNavigationState) => ({
      hoveredPlanet: state.hoveredPlanet,
      setHoveredPlanet: state.setHoveredPlanet,
      setFollowedPlanet: state.setFollowedPlanet,
    }))
  );

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * planet.rotationSpeed;
    }
    if (!isModal && orbitGroupRef.current) {
      // Обертання орбіти: якщо глобально наведено (hoveredPlanet !== null), зупиняємо обертання
      const effectiveOrbitSpeed = hoveredPlanet !== null ? SLOW_ORBIT_FACTOR : planet.orbitSpeed;
      orbitGroupRef.current.rotation.y += delta * effectiveOrbitSpeed;
    }
  });

  // Визначаємо, чи це Земля (має окремі day/night текстури)
  const isEarth = typeof planet.texture !== 'string';

  // Завантаження текстур.
  // Якщо це Земля, textures буде масивом з двох текстур (day та night),
  // інакше – один текстурний файл (day).
  const textures = useTexture(
    typeof planet.texture !== 'string'
      ? [planet.texture.day, planet.texture.night]
      : [planet.texture]
  );

  const dayTexture = Array.isArray(textures) ? textures[0] : textures;
  const nightTexture = Array.isArray(textures) && textures.length > 1 ? textures[1] : null;

  const handlePlanetClick = useCallback(() => {
    if (!planetRef.current) return;

    if (setFollowedPlanet !== undefined) {
      // Встановлюємо цю планету як обрану (для OrbitControls)
      setFollowedPlanet(planet);
    }
  }, [planet, setFollowedPlanet]);

  return (
    <>
      {!isModal ? (
        <group ref={orbitGroupRef}>
          <group position={planet.position} scale={[3, 3, 3]}>
            <Sphere
              args={[planet.radius, 32, 32]}
              ref={planetRef}
              castShadow
              receiveShadow
              onPointerOver={() => setHoveredPlanet(planet.name)}
              onPointerOut={() => setHoveredPlanet(null)}
              onClick={handlePlanetClick}
            >
              <meshStandardMaterial
                map={dayTexture instanceof THREE.Texture ? dayTexture : undefined}
                // Якщо це Земля, використовуємо emissiveMap (нічну текстуру) для затемнення,
                // а при hover додаємо теплий відтінок (наприклад, 0xffe680)
                emissiveMap={
                  isEarth && nightTexture instanceof THREE.Texture ? nightTexture : undefined
                }
                emissive={new THREE.Color(hoveredPlanet === planet.name ? 0xffe680 : 0x000000)}
                emissiveIntensity={0}
                bumpScale={0.05}
                roughness={1}
                metalness={1}
              />
            </Sphere>

            {/* Оверлей для НЕ-Землі: при hover додаємо шар із MeshBasicMaterial,
          який показує day-текстуру як повністю освітлену */}
            {!isEarth && hoveredPlanet === planet.name && (
              <Sphere args={[planet.radius, 32, 32]}>
                <meshBasicMaterial
                  map={dayTexture instanceof THREE.Texture ? dayTexture : undefined}
                  toneMapped={false}
                  transparent={true}
                  opacity={1}
                  depthTest={false}
                  polygonOffset={true}
                  polygonOffsetFactor={-1}
                  polygonOffsetUnits={-1}
                />
              </Sphere>
            )}

            {planet.hasRings && planet.ringTexture && (
              <Ring radius={1} texture={planet.ringTexture} />
            )}
          </group>
        </group>
      ) : (
        <group scale={[3, 3, 3]}>
          <Sphere
            args={[0.5, 32, 32]}
            ref={planetRef}
            castShadow
            receiveShadow
            onClick={handlePlanetClick}
          >
            <meshStandardMaterial map={dayTexture} bumpScale={0.05} roughness={1} metalness={1} />
          </Sphere>

          {planet.hasRings && planet.ringTexture && (
            <Ring radius={1} texture={planet.ringTexture} />
          )}
        </group>
      )}
    </>
  );
};

export default PlanetMesh;
