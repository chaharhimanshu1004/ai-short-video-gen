// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-shortslab.firebaseapp.com",
    projectId: "ai-shortslab",
    storageBucket: "ai-shortslab.firebasestorage.app",
    messagingSenderId: "567724771354",
    appId: "1:567724771354:web:4f84a62a275f0f9aaaa9a3",
    measurementId: "G-5N21G1MRS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app);