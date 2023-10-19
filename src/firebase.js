// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChnC5_7WpDl93vnorNVY7aEpYr6taWv1U",
  authDomain: "chess-c9f73.firebaseapp.com",
  projectId: "chess-c9f73",
  storageBucket: "chess-c9f73.appspot.com",
  messagingSenderId: "522653519363",
  appId: "1:522653519363:web:33caa2944a6e759e320836",
  measurementId: "G-FY7JDV5K0H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
