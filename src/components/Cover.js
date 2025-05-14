import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Cover.css';

// Fungsi untuk mengambil query parameter
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Fungsi untuk merapikan format nama (opsional)
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
      audioRef.current.play(); // Musik diputar setelah user klik
    }
    navigate('/invitation');
  };

  return (
    <div className="cover-container">
      <audio ref={audioRef} loop src="/bg-music.mp3" />

      <img src="/bunga.png" className="bunga top-left" alt="bunga atas kiri" />
      <img src="/bunga.png" className="bunga bottom-left" alt="bunga bawah kiri" />
      <img src="/bunga.png" className="bunga top-right" alt="bunga atas kanan" />
      <img src="/bunga.png" className="bunga bottom-right" alt="bunga bawah kanan" />

      <div className="circle">
        <div className="initial">D</div>
        <hr className="line" />
        <div className="initial">C</div>
      </div>

      <p className="subtitle">THE WEDDING OF</p>
      <h1 className="couple-name">Diva & Cut Rey</h1>

      <p className="guest">Kepada Bapak/Ibu/Saudara/i</p>
      <p className="guest-detail">{guestName}</p>

      <button className="open-button" onClick={handleClick}>
        📩 Buka Undangan
      </button>
    </div>
  );
}

export default Cover;
