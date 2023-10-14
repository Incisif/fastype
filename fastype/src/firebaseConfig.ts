// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAm96pMPy072-a8dnwz0Bk8DHc1YMkspK4",
    authDomain: "text-hub-api.firebaseapp.com",
    projectId: "text-hub-api",
    storageBucket: "text-hub-api.appspot.com",
    messagingSenderId: "490168305709",
    appId: "1:490168305709:web:abbbb5c2b6c58eb7b3d0a4",
    measurementId: "G-4355T9EFZ2"
};

// Initialize Firebase
export const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};
