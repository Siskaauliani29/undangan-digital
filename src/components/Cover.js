import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Cover.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function formatName(name) {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function Cover() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const query = useQuery();

  const rawName = query.get('to');
  const guestName = rawName ? formatName(decodeURIComponent(rawName)) : 'Tamu Undangan';

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    navigate('/invitation');
  };

  return (
    <div className="cover-container">
      <audio ref={audioRef} loop src="/bg-music.mp3" />

      {/* Background video */}
     <div className="video-background">
  <video autoPlay muted playsInline>
    <source src="/background.mp4" type="video/mp4" />
    Browser kamu tidak mendukung video tag.
  </video>
</div>


      {/* Overlay supaya teks tetap jelas */}
      <div className="overlay"></div>
      <p className="guest-detail">{guestName}</p>

      <button className="open-button" onClick={handleClick}>
        📩 Buka Undangan
      </button>
    </div>
  );
}

export default Cover;
