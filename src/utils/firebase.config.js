// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSd_NKRelgkwYCH6nP2BGkCKMcuZAeCbw",
  authDomain: "reactjs-projects-63ed2.firebaseapp.com",
  projectId: "reactjs-projects-63ed2",
  storageBucket: "reactjs-projects-63ed2.firebasestorage.app",
  messagingSenderId: "500788493370",
  appId: "1:500788493370:web:ff29da43e40eb416aac903",
  measurementId: "G-980TR75VNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { app, auth , db };