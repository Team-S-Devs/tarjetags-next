// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRYaILyCtWdbO0RIMG_QhFe5wuoFHauj8",
  authDomain: "tarjetags.firebaseapp.com",
  projectId: "tarjetags",
  storageBucket: "tarjetags.appspot.com",
  messagingSenderId: "577406688040",
  appId: "1:577406688040:web:737b8b7f590e58293b8e1d",
  measurementId: "G-JJ773YQEQ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, storage, db };
