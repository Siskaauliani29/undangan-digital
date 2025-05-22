import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './InvitationPage.css';
import BackgroundMusic from './BackgroundMusic';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { db } from './firebaseConfig';
import { ref, push, onValue } from "firebase/database";

function InvitationPage() {
  const [rsvpList, setRsvpList] = useState([]);
  const [wishesList, setWishesList] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [showGiftInfo, setShowGiftInfo] = useState(false);
  const [rsvpPage, setRsvpPage] = useState(1);
  const [wishesPage, setWishesPage] = useState(1);
  const itemsPerPage = 4;

  const totalRsvpPages = Math.ceil(rsvpList.length / itemsPerPage);
  const totalWishesPages = Math.ceil(wishesList.length / itemsPerPage);
  
  const handleSaveDate = () => {
    const title = encodeURIComponent("Wedding Day of Diva & Reyhan");
    const location = encodeURIComponent("Banda Aceh, Indonesia");
    const details = encodeURIComponent("Join us on our wedding day!");
    const startDate = "20250525T020000Z";
    const endDate = "20250525T040000Z";

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;
    window.open(url, "_blank");
  };

  const paginate = (list, page) => {
    const start = (page - 1) * itemsPerPage;
    return list.slice(start, start + itemsPerPage);
  };

  const galleryImages = [
    '/assets/couple.png',
    '/assets/story1.png',
    '/assets/story2.png',
    '/assets/story3.png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const audioRef = useRef(null);

  useEffect(() => {
    // Ambil data RSVP dari Firebase
    const rsvpRef = ref(db, 'rsvpList');
    onValue(rsvpRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
       const list = Object.values(data).sort((a, b) => b.id - a.id);
setRsvpList(list);
      }
    });

    // Ambil data Wishes dari Firebase
    const wishRef = ref(db, 'wishesList');
    onValue(wishRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
      const list = Object.values(data).sort((a, b) => b.id - a.id);
setWishesList(list);
      }
    });
  }, []);

  const calculateCountdown = () => {
    const targetDate = new Date('2025-05-25T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const status = e.target.status.value;

    const dateObj = new Date();
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ' / ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRSVP = {
      id: Date.now(),
      name,
      status,
      date: formattedDate,
    };

    const rsvpRef = ref(db, 'rsvpList');
    push(rsvpRef, newRSVP);
    setRsvpPage(1);
    e.target.reset();
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const city = e.target.city.value;
    const message = e.target.message.value;

    const newWish = {
      id: Date.now(),
      name,
      city,
      message,
    };

    const wishRef = ref(db, 'wishesList');
    push(wishRef, newWish);
    setWishesPage(1); 
    e.target.reset();
  };

  const handleCopy1 = () => {
    navigator.clipboard.writeText('7215488599');
    alert('Nomor rekening disalin!');
  };
  const handleCopy2 = () => {
    navigator.clipboard.writeText('0431307871');
    alert('Nomor rekening disalin!');
  };
  return (
    <motion.div
      className="invitation-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
    >
     
      <BackgroundMusic />

      {/* Bunga animasi */}
      <img src="/bunga.png" alt="top decoration" className="corner top-right animate-flower" />
      <img src="/bunga.png" alt="bottom decoration" className="corner bottom-left animate-flower" />

      <p className="invitation-title">THE WEDDING OF</p>

      <div className="initials-box">
        <div className="initial">D</div>
        <hr className="line" />
        <div className="initial">C</div>
      </div>

      <h1 className="couple-name">
        <span>Diva</span> & <span>Cut Rey</span>
      </h1>

      <div className="countdown">
        <div className="countdown-item"><div>{timeLeft.days}</div><p>Hari</p></div>
        <div className="countdown-item"><div>{timeLeft.hours}</div><p>Jam</p></div>
        <div className="countdown-item"><div>{timeLeft.minutes}</div><p>Menit</p></div>
        <div className="countdown-item"><div>{timeLeft.seconds}</div><p>Detik</p></div>
      </div>

      <p className="date">Minggu, 25 Mei 2025</p>

      <button className="save-date" onClick={handleSaveDate}>
  📅 Save The Date
</button>

      <div className="scroll-more">⬇️ Scroll untuk melihat lebih banyak</div>
<div className="custom-wave">
 <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 580" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="43%" y1="100%" x2="57%" y2="0%"><stop offset="5%" stop-color="#0f1621"></stop><stop offset="95%" stop-color="#8ED1FC"></stop></linearGradient></defs><path d="M 0,600 L 0,150 C 102.6602870813397,132.95693779904306 205.3205741626794,115.91387559808611 286,113 C 366.6794258373206,110.08612440191389 425.37799043062194,121.30143540669857 525,111 C 624.6220095693781,100.69856459330143 765.1674641148325,68.88038277511961 875,84 C 984.8325358851675,99.11961722488039 1063.952153110048,161.17703349282297 1153,180 C 1242.047846889952,198.82296650717703 1341.023923444976,174.41148325358853 1440,150 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="43%" y1="100%" x2="57%" y2="0%"><stop offset="5%" stop-color="#0f1621"></stop><stop offset="95%" stop-color="#8ED1FC"></stop></linearGradient></defs><path d="M 0,600 L 0,350 C 81.5023923444976,304.94736842105266 163.0047846889952,259.8947368421053 263,282 C 362.9952153110048,304.1052631578947 481.48325358851685,393.3684210526315 572,416 C 662.5167464114832,438.6315789473685 725.0622009569377,394.63157894736844 826,369 C 926.9377990430623,343.36842105263156 1066.267942583732,336.10526315789474 1175,336 C 1283.732057416268,335.89473684210526 1361.8660287081339,342.9473684210526 1440,350 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
</div>


      <div className="full-invitation">
  <p className="opening">Assalamu’alaikum Wr. Wb.</p>
  <p className="invitation-desc">
    Tanpa mengurangi rasa hormat. Kami mengundang <br />
    Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri <br />
    acara pernikahan kami:
  </p>

  <div className="person">
  <h2 className="name">DIVA HERIANDA SYAHPUTRA</h2>
  <p className="desc">Putra dari Bapak Hermansyah dan Ibu Mastura</p>
  <div className="icon-circle">
    <a href="https://www.instagram.com/defzzz11?igsh=ZzY1eTA3dGcxNzFl" target="_blank" rel="noopener noreferrer">
      <img src="/instagram-icon.png" alt="ig" />
    </a>
  </div>
</div>

<div className="and-symbol">&</div>

<div className="person">
  <h2 className="name">CUT RAIHAN SAIDA</h2>
  <p className="desc">
    Putri dari Bapak Mawardi Noor dan Ibu Marlianti
  </p>
  <div className="icon-circle">
    <a href="https://www.instagram.com/cutreyhansaida?igsh=MWgwa2k2MjQ1NmNwbA==" target="_blank" rel="noopener noreferrer">
      <img src="/instagram-icon.png" alt="ig" />
    </a>
  </div>
</div>

</div>
<div className="story-section">
  <h2 className="story-title">Our Love Story </h2>

  <div className="story-block">
    <h3 className="story-subtitle">2016</h3>
    <hr />
    <p>
    Pertama kali kami saling mengenal satu sama lain pada Tahun 2016 saat kami menduduki bangku Sekolah Menengah Atas.
    Kami dikenalkan oleh salah seorang teman kami. 
    Namun, saat itu belum timbul perasaan diantara kami. Setelah saling mengenal di Tahun ini, kami sempat lost contact di tahun-tahun berikutnya.
    </p>
  </div>

  <div className="story-block">
    <h3 className="story-subtitle">2021</h3>
    <hr />
    <p>
      Akhirnya di Tahun ini kami kembali dipertemukan tepat setelah mempelai wanita menyelesaikan wisuda Sarjana nya. Awalnya hanya basa-basi biasa untuk bertanya kabar satu sama lain. Setelah beberapa minggu kemudian, Sang mempelai pria akhirnya memberanikan diri untuk mendatangi kedua orang tua mempelai wanita. Akhirnya kami memutuskan untuk berkomitmen kepada satu tujuan, yaitu menikah. 
    </p>
  </div>

  <div className="story-block">
    <h3 className="story-subtitle">2024</h3>
    <hr />
    <p>
     Setelah dirasa cukup untuk kami saling mengenal satu sama lain, kami memutuskan untuk bertunangan di Tahun 2024. Besar harapan kami untuk bisa melanjutkan ke jenjang akhir hubungan kami. 
    </p>
  </div>

  <div className="story-block">
    <h3 className="story-subtitle">2025</h3>
    <hr />
    <p>
     Setelah berbagai macam lika-liku hubungan yang telah kami lewati, akhirnya sampailah pada jenjang pernikahan yang kami nantikan. Hal ini bukan menjadi akhir dari perjuangan kami, ini merupakan awal dari hubungan yang akan kami rajut bersama sampai akhir hayat.
    </p>
  </div>
</div>
<div className="custom-wave1">
 <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 290" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="43%" y1="100%" x2="57%" y2="0%"><stop offset="5%" stop-color="#0f1621"></stop><stop offset="95%" stop-color="#8ED1FC"></stop></linearGradient></defs><path d="M 0,400 L 0,100 C 95.46411483253587,80.52631578947368 190.92822966507174,61.05263157894736 273,56 C 355.07177033492826,50.94736842105264 423.7511961722488,60.31578947368422 526,78 C 628.2488038277512,95.68421052631578 764.0669856459331,121.68421052631578 865,117 C 965.9330143540669,112.31578947368422 1031.9808612440193,76.94736842105263 1122,69 C 1212.0191387559807,61.05263157894736 1326.0095693779904,80.52631578947368 1440,100 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="43%" y1="100%" x2="57%" y2="0%"><stop offset="5%" stop-color="#0f1621"></stop><stop offset="95%" stop-color="#8ED1FC"></stop></linearGradient></defs><path d="M 0,400 L 0,233 C 116.04784688995213,238.70334928229664 232.09569377990425,244.4066985645933 317,238 C 401.90430622009575,231.5933014354067 455.665071770335,213.07655502392348 540,217 C 624.334928229665,220.92344497607652 739.2440191387559,247.28708133971293 860,264 C 980.7559808612441,280.7129186602871 1107.358851674641,287.77511961722485 1205,281 C 1302.641148325359,274.22488038277515 1371.3205741626793,253.61244019138758 1440,233 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
</div>

<div className="event-section">
  <div className="event-card">
    <h2 className="event-title">Akad Nikah</h2>
    <p className="event-date">Minggu, 25 Mei 2025</p>
    <p className="event-time">Pukul : 10:00 WIB</p>
    <p className="event-location">
      <strong>Masjid Raya Baiturrahman</strong><br />
     Jl. Moh. Jam No.1, Kp. Baru, Kec. Baiturrahman, Kota Banda Aceh, Aceh
    </p>
  </div>

  <a
  className="location-button"
  href="https://maps.app.goo.gl/gRvz57DmEp9rv5Vr6" // Ganti dengan link Google Maps yang sesuai
  target="_blank"
  rel="noopener noreferrer"
>
  📍 Lihat Lokasi
</a>
</div>
<div className="digital-envelope-section">
      <h2 className="section-title">Amplop Digital</h2>
      <p className="section-subtext">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
      </p>
      <p className="section-subtext">
        Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
      </p>

      <button className="gift-button" onClick={() => setShowGiftInfo(!showGiftInfo)}>
        🎁 Kirim Hadiah
      </button>

      {showGiftInfo && (
        <div className="gift-info-container">
          <div className="card-info">
            <div className="bank-header">
              <img src="/bsi-logo.png" alt="BSI Logo" className="bank-logo" />
            </div>
            <div className="card-number">7215488599</div>
            <div className="card-name">CUT RAIHAN SAIDA</div>
            <button className="copy-btn" onClick={handleCopy1}>📋 Copy</button>
          </div>
            <div className="card-info">
            <div className="bank-header">
              <img src="/bca-logo.png" alt="BCA Logo" className="bank-logo1" />
            </div>
            <div className="card-number">0431307871</div>
            <div className="card-name">DIVA HERIANDA SYAHPUTRA</div>
            <button className="copy-btn" onClick={handleCopy2}>📋 Copy</button>
          </div>

            

          <div className="address-card">
            <h4>🎁 Kirim Hadiah</h4>
            <p>Nama Penerima: Cut Rey </p>
            <p>No. HP: 085247099098</p>
            <p>
              Alamat: Jl. Angsa, dusun suka jaya, desa batoh, kec. lueng bata, banda aceh, aceh.
            </p>
          </div>
        </div>
      )}
    </div>
 <section className="rsvp-wishes px-4 py-8 bg-white">
      <div className="rsvp max-w-md mx-auto text-center">
        <h2 className="mb-4 text-2xl font-semibold">RSVP</h2>
        <form onSubmit={handleRSVPSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="px-4 py-2 border rounded-md w-full"
          />
          <select
            name="status"
            required
            className="px-4 py-2 border rounded-md w-full"
          >
            <option value="">Select Status</option>
            <option value="Attending">Attending</option>
            <option value="Not Attending">Not Attending</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>

        <div className="rsvp-list mt-6">
          <h3>Guest List</h3>
          {rsvpList.length === 0 ? (
            <p>No RSVP yet.</p>
          ) : (
            <>
              <ul>
                {paginate(rsvpList, rsvpPage).map((rsvp) => (
                  <li key={rsvp.id}>
                    {rsvp.name}: {rsvp.status}
                  </li>
                ))}
              </ul>
              <div className="pagination-controls flex justify-between mt-2">
                <button disabled={rsvpPage === 1} onClick={() => setRsvpPage(rsvpPage - 1)}>
                  ⬅ Previous
                </button>
                <span>{rsvpPage} / {totalRsvpPages}</span>
                <button disabled={rsvpPage === totalRsvpPages} onClick={() => setRsvpPage(rsvpPage + 1)}>
                  Next ➡
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="wishes max-w-md mx-auto text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">Wishes</h2>
        <form onSubmit={handleWishSubmit} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Name" required className="px-4 py-2 border rounded-md" />
          <input type="text" name="city" placeholder="City" className="px-4 py-2 border rounded-md" />
          <textarea name="message" placeholder="Message" className="px-4 py-2 border rounded-md"></textarea>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Send
          </button>
        </form>

        <div className="wishes-list mt-6">
          <h3>Guest Wishes</h3>
          {wishesList.length === 0 ? (
            <p>No wishes yet.</p>
          ) : (
            <>
              <ul>
                {paginate(wishesList, wishesPage).map((wish) => (
                  <li key={wish.id}>
                    <strong>{wish.name}</strong> ({wish.city}): {wish.message}
                  </li>
                ))}
              </ul>
              <div className="pagination-controls flex justify-between mt-2">
                <button disabled={wishesPage === 1} onClick={() => setWishesPage(wishesPage - 1)}>
                  ⬅ Previous
                </button>
                <span>{wishesPage} / {totalWishesPages}</span>
                <button disabled={wishesPage === totalWishesPages} onClick={() => setWishesPage(wishesPage + 1)}>
                  Next ➡
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
    <div className="gallery-section">
  <h4>Our Memories</h4>
  <div className="gallery-slider">
    <button onClick={prevSlide} className="nav-button prev">‹</button>
    <div className="slide-wrapper">
    <img src={galleryImages[currentSlide]} alt={`Memory ${currentSlide + 1}`} />
    </div>
    <button onClick={nextSlide} className="nav-button next">›</button>
  </div>
</div>
    <div className="container">
  <div className="initial-box">
    <div class="floral-top-left">
      <img src="/floral.png" alt="floral" />
    </div>
    <div className="floral-bottom-right">
      <img src="/floral-right.png" alt="floral" />
    </div>
    <span style={{ fontSize: '50px' }}>D</span>
<hr />
<span style={{ fontSize: '50px' }}>C</span>
  </div>


  <p className="invitation-text">
    Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
    Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
    kehadiran dan doa restunya, kami mengucapkan terima kasih.
  </p>
  <p className="closing-text">
    Wassalamu’alaikum Wr. Wb.
  </p>
  <h2 className="names">Diva & Cut Rey</h2>
</div>


<div className="watermark">
  Made with ❤️ by Siskaa.id
  <div className="social-icons">
    <a
      href="https://www.instagram.com/siskaaulianni?igsh=MTBlNGgyZnR0NW83Yw=="
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <FaInstagram />
    </a>
    <a
      href="https://wa.me/6287891264500"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <FaWhatsapp />
    </a>
  </div>
</div>

    </motion.div>
    
  );
}

export default InvitationPage;
