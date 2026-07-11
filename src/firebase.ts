import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD17_1jBiTP8Y2fwZwxKSbriQAlS9Cr3io",
  authDomain: "bhishmaidcard.firebaseapp.com",
  projectId: "bhishmaidcard",
  storageBucket: "bhishmaidcard.firebasestorage.app",
  messagingSenderId: "996890555133",
  appId: "1:996890555133:web:038b77c8f2844b6b9f4494"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
