// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYWM-a6aY-RvRMB2hMxkH0nmjHB5oCfeg",
  authDomain: "respawn-3a64c.firebaseapp.com",
  projectId: "respawn-3a64c",
  storageBucket: "respawn-3a64c.appspot.com",
  messagingSenderId: "175510468430",
  appId: "1:175510468430:web:2dfeef92a3b25e7434101f",
  measurementId: "G-11L71BM8YX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
