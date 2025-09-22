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
  const title = encodeURIComponent("Wedding Day of Diva & Cutrey");
  const location = encodeURIComponent("Banda Aceh, Indonesia");
  const details = encodeURIComponent("Join us on our wedding day!");

  // WIB 11:00 → 04:00 UTC
  const startDate = "20251005T040000Z"; // 5 Okt 2025, 11:00 WIB
  const endDate = "20251005T090000Z";   // 5 Okt 2025, 16:00 WIB (perkiraan selesai)

  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;
  window.open(url, "_blank");
};


  const paginate = (list, page) => {
    const start = (page - 1) * itemsPerPage;
    return list.slice(start, start + itemsPerPage);
  };

  const galleryImages = [
    '/assets/story1.jpg',
    '/assets/story2.jpg',
    '/assets/story3.jpg',
    '/assets/story4.jpg',
    '/assets/story5.jpg',
    '/assets/story6.jpg',
    '/assets/story7.jpg',
    '/assets/story8.jpg',
    '/assets/story9.jpg',
    '/assets/story10.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const audioRef = useRef(null);

 useEffect(() => {
  // RSVP resepsi
  const rsvpRef = ref(db, 'resepsiRsvpList');
  onValue(rsvpRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const list = Object.values(data).sort((a, b) => b.id - a.id);
      setRsvpList(list);
    } else {
      setRsvpList([]);
    }
  });

  // Wishes resepsi
  const wishRef = ref(db, 'resepsiWishesList');
  onValue(wishRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const list = Object.values(data).sort((a, b) => b.id - a.id);
      setWishesList(list);
    } else {
      setWishesList([]);
    }
  });
}, []);


  const calculateCountdown = () => {
  const targetDate = new Date('2025-10-05T00:00:00').getTime();
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
        <span>Diva</span> & <span>Cutrey</span>
      </h1>

      <div className="countdown">
        <div className="countdown-item"><div>{timeLeft.days}</div><p>Hari</p></div>
        <div className="countdown-item"><div>{timeLeft.hours}</div><p>Jam</p></div>
        <div className="countdown-item"><div>{timeLeft.minutes}</div><p>Menit</p></div>
        <div className="countdown-item"><div>{timeLeft.seconds}</div><p>Detik</p></div>
      </div>

      <p className="date">Minggu, 5 Oktober 2025</p>

      <button className="save-date" onClick={handleSaveDate}>
  📅 Save The Date
</button>

      <div className="scroll-more">⬇️ Scroll untuk melihat lebih banyak</div>
<div class="custom-wave">
  <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    <defs>

      <linearGradient id="gradientFront" x1="43%" y1="100%" x2="57%" y2="0%">
        <stop offset="0%" stop-color="#1b2231"></stop>
        <stop offset="50%" stop-color="#FF8DA1"></stop>
        <stop offset="100%" stop-color="#8ED1FC"></stop>
      </linearGradient>

      <linearGradient id="gradientBack" x1="43%" y1="100%" x2="57%" y2="0%">
        <stop offset="0%" stop-color="#0f1621"></stop>
        <stop offset="100%" stop-color="#1b2231"></stop>
      </linearGradient>
    </defs>


    <path fill="url(#gradientBack)" fill-opacity="0.7">
      <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
        M0,160 C480,280 960,40 1440,160 L1440,320 L0,320 Z;
        M0,180 C480,60 960,300 1440,180 L1440,320 L0,320 Z;
        M0,160 C480,280 960,40 1440,160 L1440,320 L0,320 Z
      " />
    </path>


    <path fill="url(#gradientFront)" fill-opacity="0.9">
      <animate attributeName="d" dur="12s" repeatCount="indefinite" values="
        M0,200 C480,100 960,260 1440,200 L1440,320 L0,320 Z;
        M0,220 C480,280 960,120 1440,220 L1440,320 L0,320 Z;
        M0,200 C480,100 960,260 1440,200 L1440,320 L0,320 Z
      " />
    </path>
  </svg>
</div>






      <div className="full-invitation">
  <p className="opening">Assalamu’alaikum Wr. Wb.</p>
  <p className="invitation-desc">
    Tanpa mengurangi rasa hormat. Kami mengundang <br />
    Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri <br />
    acara Resepsi pernikahan kami:
  </p>

  <div className="person">
  <h2 className="name">DIVA HERIANDA SYAHPUTRA</h2>
  <p className="desc">Putra ke - 5 dari Bapak Hermansyah dan Ibu Mastura</p>
  <div className="icon-circle">
    <a href="https://www.instagram.com/defzzz11?igsh=ZzY1eTA3dGcxNzFl" target="_blank" rel="noopener noreferrer">
      <img src="/instagram-icon.png" alt="ig" />
    </a>
  </div>
</div>

<div className="and-symbol">&</div>

<div className="person">
  <h2 className="name">CUT RAIHAN SAIDA, S.Ag</h2>
  <p className="desc">
    Putri ke - 3 dari Bapak Mawardi Noor dan Ibu Marlianti
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
  {/* Akad Nikah */}
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
    href="https://maps.app.goo.gl/gRvz57DmEp9rv5Vr6"
    target="_blank"
    rel="noopener noreferrer"
  >
    📍 Lihat Lokasi
  </a>
</div>

<div className="event-section">
  {/* Resepsi */}
  <div className="event-card">
    <h2 className="event-title">Resepsi</h2>
    <p className="event-date">Minggu, 05 Oktober 2025</p>
    <p className="event-time">Pukul : 11.00 - selesai</p>
    <p className="event-location">
      <strong>Kediaman Mempelai Wanita</strong><br />
      Jl. Angsa, Dusun Suka Jaya, Batoh, Kec. Lueng Bata, Banda Aceh
    </p>
    
  </div>

  <a
    className="location-button"
    href="https://maps.app.goo.gl/FiTNkFomS2dsu9U39?g_st=iw"
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
            <p>Nama Penerima: Cutrey </p>
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
    <h2 className="mb-4 text-2xl font-semibold">RSVP Resepsi</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const status = e.target.status.value;

        const dateObj = new Date();
        const formattedDate =
          dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }) +
          ' / ' +
          dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newRSVP = {
          id: Date.now(),
          name,
          status,
          date: formattedDate,
        };

        const rsvpRef = ref(db, 'resepsiRsvpList'); // 🔹 node baru
        push(rsvpRef, newRSVP);
        setRsvpPage(1);
        e.target.reset();
      }}
      className="flex flex-col gap-4"
    >
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
            <button
              disabled={rsvpPage === 1}
              onClick={() => setRsvpPage(rsvpPage - 1)}
            >
              ⬅ Previous
            </button>
            <span>
              {rsvpPage} / {totalRsvpPages}
            </span>
            <button
              disabled={rsvpPage === totalRsvpPages}
              onClick={() => setRsvpPage(rsvpPage + 1)}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  </div>

  <div className="wishes max-w-md mx-auto text-center mt-10">
    <h2 className="text-2xl font-semibold mb-4">Wishes Resepsi</h2>
    <form
      onSubmit={(e) => {
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

        const wishRef = ref(db, 'resepsiWishesList'); // 🔹 node baru
        push(wishRef, newWish);
        setWishesPage(1);
        e.target.reset();
      }}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="px-4 py-2 border rounded-md"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        className="px-4 py-2 border rounded-md"
      />
      <textarea
        name="message"
        placeholder="Message"
        className="px-4 py-2 border rounded-md"
      ></textarea>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
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
            <button
              disabled={wishesPage === 1}
              onClick={() => setWishesPage(wishesPage - 1)}
            >
              ⬅ Previous
            </button>
            <span>
              {wishesPage} / {totalWishesPages}
            </span>
            <button
              disabled={wishesPage === totalWishesPages}
              onClick={() => setWishesPage(wishesPage + 1)}
            >
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
  <h2 className="names">Diva & Cutrey</h2>
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
