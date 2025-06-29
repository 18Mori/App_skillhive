import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

// TODO: Replace with your web app's Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize and export a function for logging analytics events
const analytics = getAnalytics(app);
export const logFirebaseEvent = (eventName, eventParams = {}) => {
    logEvent(analytics, eventName, eventParams);
};