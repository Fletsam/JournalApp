// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEJpWbaZ2mWKRivuq-LBDcFbAXhE_7gIA",
  authDomain: "journalappreact-46f2c.firebaseapp.com",
  projectId: "journalappreact-46f2c",
  storageBucket: "journalappreact-46f2c.appspot.com",
  messagingSenderId: "1036407183372",
  appId: "1:1036407183372:web:f91b59d388735de50d3629",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
