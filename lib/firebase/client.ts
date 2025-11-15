import { initializeApp, getApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnxqay3G6Rzve3mfvJ0aZjKzcnSDRnc30",
  authDomain: "nest-social-networking.firebaseapp.com",
  projectId: "nest-social-networking",
  storageBucket: "nest-social-networking.firebasestorage.app",
  messagingSenderId: "905972619124",
  appId: "1:905972619124:web:dbd2102e8ed46eef617e21",
  measurementId: "G-93J6FN9TT3"
};

// Initialize Firebase
let app: FirebaseApp;
try {
  app = getApp();
} catch (e) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };