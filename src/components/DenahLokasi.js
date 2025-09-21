// DenahLokasi.js
import React from "react";
import "./DenahLokasi.css"; // CSS terpisah biar rapi

function DenahLokasi() {
  return (
    <div className="map">
      {/* Jalan */}
      <div className="road vertical"></div>
      <div className="road horizontal" style={{ top: "120px" }}></div>
      <div className="road horizontal" style={{ bottom: "40px" }}></div>

      {/* Label jalan */}
      <div className="road-label jl-angsa">Jl. Angsa</div>
      <div className="road-label jl-muhammadiyah">Jl. Muhammadiyah</div>
      <div className="road-label jl-moh-hasan">Jl. Mr. Mohd Hasan</div>

      {/* Tempat */}
      <div className="place masjid">Masjid Jami' Lueng Bata</div>
      <div className="place tk">TK IT Al-Jannah</div>
      <div className="place rumah">Rumah Mempelai</div>
      <div className="place kapolsek">Kapolsek Lueng Bata</div>
      <div className="place pasar">Pasar Batoh</div>
    </div>
  );
}

export default DenahLokasi;
