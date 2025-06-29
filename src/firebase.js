// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFPHgNQkXcbWOSHEGHfrkUlqKaLjlPMSo",
  authDomain: "react-a1140.firebaseapp.com",
  projectId: "react-a1140",
  storageBucket: "react-a1140.firebasestorage.app",
  messagingSenderId: "8703312887",
  appId: "1:8703312887:web:888871d244767dcaf3e4f2",
  measurementId: "G-HY8CEQK2S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);