import React, { useRef, useState, useEffect } from 'react';
import { FaMusic } from 'react-icons/fa';
import './BackgroundMusic.css';


const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    audioRef.current.play().catch(() => setIsPlaying(false));
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop src="/bg-music.mp3" />
      <button
        onClick={toggleMusic}
        className={`music-toggle ${isPlaying ? 'playing' : 'paused'}`}
        aria-label="Toggle Background Music"
      >
        <FaMusic />
      </button>
    </>
  );
};

export default BackgroundMusic;
