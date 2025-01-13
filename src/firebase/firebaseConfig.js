import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnNyDdKKxfPU4ZvsSwzrXh5WDbjSuyN0g",
  authDomain: "nafusite-app.firebaseapp.com",
  projectId: "nafusite-app",
  storageBucket: "nafusite-app.firebasestorage.app",
  messagingSenderId: "878107116550",
  appId: "1:878107116550:web:985ba01d9bcb38d9436f87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}