'use client';

import React from 'react';
import Image from 'next/image';
import useAudio from '@/hooks/useAudio';
import PlayIcon from '@/public/icons/audio_play.svg';
import StopIcon from '@/public/icons/audio_stop.svg';

const ToggleAudio = () => {
  const { toggleAudio, isPlaying } = useAudio('/audio/space.mp3');

  return (
    <button
      className='fixed z-[90] bottom-4 left-8 p-2 bg-gradient-to-br from-slate-500/20 to-zinc-300/30 rounded-full shadow-sm hover:shadow-lg backdrop-blur cursor-pointer active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500'
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
      aria-pressed={isPlaying}
      role='button'
    >
      {isPlaying ? (
        <Image src={StopIcon} alt='Stop audio' />
      ) : (
        <Image src={PlayIcon} alt='Play audio' />
      )}
    </button>
  );
};

export default ToggleAudio;
