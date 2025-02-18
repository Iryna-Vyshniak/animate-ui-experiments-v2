import { Line } from '@react-three/drei';
import React from 'react';
import { Vector3 } from 'three';

const OrbitLine = ({ radius }: { radius: number }) => {
  // Створюємо масив з 65 точок, які представляють коло (орбіту)
  const points = Array.from({ length: 65 }, (_, i) => {
    // Обчислюємо кут для поточної точки (від 0 до 2π)
    const theta = (i / 64) * Math.PI * 2;
    // Повертаємо точку у вигляді вектора (x, y, z)
    // Точки розташовані по колу з центром у (0, 0, 0) та з радіусом "radius"
    return new Vector3(
      radius * Math.cos(theta), // x-координата
      0, // y-координата (0, бо орбіта лежить у горизонтальній площині)
      radius * Math.sin(theta) // z-координата
    );
  });

  // компонент Line, який використовує розраховані точки для малювання орбіти
  return (
    <Line
      points={points} // Масив точок, що формують лінію (орбіту)
      color='#ffffff'
      opacity={0.15}
      transparent
      lineWidth={0.5}
    />
  );
};

export default OrbitLine;
