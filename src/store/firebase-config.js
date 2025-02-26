import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBejkrrtL13tUHmzsCB15QJ8CbSYXmQBRs",
  authDomain: "nosax-project.firebaseapp.com",
  projectId: "nosax-project",
  storageBucket: "nosax-project.firebasestorage.app",
  messagingSenderId: "458814073424",
  appId: "1:458814073424:web:6884230d0b75744c22ff55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
