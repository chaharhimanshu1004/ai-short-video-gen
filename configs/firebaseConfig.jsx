
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-shortslab.firebaseapp.com",
    projectId: "ai-shortslab",
    storageBucket: "ai-shortslab.firebasestorage.app",
    messagingSenderId: "567724771354",
    appId: "1:567724771354:web:7f30152264542a59aaa9a3",
    measurementId: "G-WNDEMHY6HJ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app);