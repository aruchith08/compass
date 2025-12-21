
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCah9vTy7xZV8xD1na2v1YwKHWUUKkNhCQ",
  authDomain: "compass-e8db9.firebaseapp.com",
  projectId: "compass-e8db9",
  storageBucket: "compass-e8db9.firebasestorage.app",
  messagingSenderId: "404540192208",
  appId: "1:404540192208:web:0372061ad42a3c300d75d5",
  measurementId: "G-NFKVGT1D03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
