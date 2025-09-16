// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 🔹 Replace these with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBGwUcX2TgBP-mMp2k4ebHdOIcrZKZzeso",
  authDomain: "blog-application-ca93d.firebaseapp.com",
  projectId: "blog-application-ca93d",
  storageBucket: "blog-application-ca93d.firebasestorage.app",
  messagingSenderId: "145730390365",
  appId: "1:145730390365:web:cb5cb71e9cbe983b89c0b4",
  measurementId: "G-T838BW5TSE"
};


// 1️⃣ Initialize app first
const app = initializeApp(firebaseConfig);

// 2️⃣ Then export auth and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
