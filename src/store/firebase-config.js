import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPsJlWeoIoz_Klbx8_uHPeWCscVqMT96o",
  authDomain: "nosax-web.firebaseapp.com",
  projectId: "nosax-web",
  storageBucket: "nosax-web.firebasestorage.app",
  messagingSenderId: "68245518546",
  appId: "1:68245518546:web:8c0d1fe0f10cb1a82b950b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
