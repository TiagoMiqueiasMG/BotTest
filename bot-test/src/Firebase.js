// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCtggu1cPIAIo4XBSFntNdgOeYh5xSZl94",
    authDomain: "bot-test-9c9de.firebaseapp.com",
    projectId: "bot-test-9c9de",
    storageBucket: "bot-test-9c9de.appspot.com",
    messagingSenderId: "480774082061",
    appId: "1:480774082061:web:4965c96493168cb12c0f44",
    measurementId: "G-KHPRFGL8SR"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
