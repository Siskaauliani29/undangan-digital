// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Tambahkan ini jika pakai Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyD-W0S-B7mEoaLheuHsFenRZ5aXEKiY82w",
  authDomain: "undangan-digital-2fd14.firebaseapp.com",
  databaseURL: "https://undangan-digital-2fd14-default-rtdb.firebaseio.com",
  projectId: "undangan-digital-2fd14",
  storageBucket: "undangan-digital-2fd14.firebasestorage.app",
  messagingSenderId: "1016896840368",
  appId: "1:1016896840368:web:1dc3ded449f16234b09175",
  measurementId: "G-0TX066CW9W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app); // Inisialisasi Realtime Database

export { db, analytics };
