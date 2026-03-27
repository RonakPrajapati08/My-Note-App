// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9HGdpUehZ86SFCE6nZme6p7h1PMjgkvk",
  authDomain: "note-app-87732.firebaseapp.com",
  projectId: "note-app-87732",
  storageBucket: "note-app-87732.firebasestorage.app",
  messagingSenderId: "140421949400",
  appId: "1:140421949400:web:22236ab84449e1059db4ad",
  measurementId: "G-6YJQ324PDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);