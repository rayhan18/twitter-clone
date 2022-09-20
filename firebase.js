// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";

import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitted-clone.firebaseapp.com",
  projectId: "twitted-clone",
  storageBucket: "twitted-clone.appspot.com",
  messagingSenderId: "50797219415",
  appId: "1:50797219415:web:0e68bfd9dd91312d039d12"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db= getFirestore();
const  storage =getStorage();
export {app , db ,storage}
