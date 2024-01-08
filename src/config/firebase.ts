// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSk7w4PHLeoLJ31z71IHy08rz1X7guJ54",
  authDomain: "react-social-media-db035.firebaseapp.com",
  projectId: "react-social-media-db035",
  storageBucket: "react-social-media-db035.appspot.com",
  messagingSenderId: "739545531774",
  appId: "1:739545531774:web:a0ef22a5c1a6cfc4aadf2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);