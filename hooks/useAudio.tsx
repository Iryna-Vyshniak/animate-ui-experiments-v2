'use client';

import { useEffect, useRef, useState } from 'react';

interface UseAudioReturn {
  toggleAudio: () => void;
  isPlaying: boolean;
}

const useAudio = (audioFile: string): UseAudioReturn => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioFile);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [audioFile]);

  const toggleAudio = (): void => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Помилка відтворення аудіо:', error);
      });
      setIsPlaying(true);
    }
  };

  return { toggleAudio, isPlaying };
};

export default useAudio;
