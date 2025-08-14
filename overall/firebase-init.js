// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-check.js";

// ✅ Debug mode for localhost testing (remove in production)
//if (location.hostname === "localhost") {
//    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
//}

const firebaseConfig = {
  apiKey: "AIzaSyCYe3m5O6X1-q47u1w1GQ4bT8pAvJ5tzq8",
  authDomain: "tracollector.firebaseapp.com",
  databaseURL: "https://tracollector-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tracollector",
  storageBucket: "tracollector.firebasestorage.app",
  messagingSenderId: "520928034041",
  appId: "1:520928034041:web:1e5facfbe4ddb5e55e7628",
  measurementId: "G-YPW4TB6P51"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Initialize App Check (replace with your site key from Firebase Console)
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("B219443A-F1D5-45AA-9977-0E6CE9D313F3"),
    isTokenAutoRefreshEnabled: true
});

// 🔹 Initialize Realtime Database
export const db = getDatabase(app);

console.log("✅ Firebase + App Check initialized");
