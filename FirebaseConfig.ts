// FirebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tvoja Firebase konfiguracija
const firebaseConfig = {
  apiKey: "AIzaSyDQjGi_8N7ddaJgSX-lXom48sT12be1aZE",
  authDomain: "shopnative-418aa.firebaseapp.com",
  projectId: "shopnative-418aa",
  storageBucket: "shopnative-418aa.appspot.com",
  messagingSenderId: "635966113791",
  appId: "1:635966113791:web:1c3e4eeeb8fc2ad7abc9ca",
};

// Inicijalizuj Firebase app
const app = initializeApp(firebaseConfig);

// Exportuj servise
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
