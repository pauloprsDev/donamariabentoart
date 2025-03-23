import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB0pBML7vqhws_mN0vqXMDPnmUoA96jWQc",
    authDomain: "donamariabento-8ffa3.firebaseapp.com",
    projectId: "donamariabento-8ffa3",
    storageBucket: "donamariabento-8ffa3.firebasestorage.app",
    messagingSenderId: "214747042780",
    appId: "1:214747042780:web:7c381b2fe86c1b83473519"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };