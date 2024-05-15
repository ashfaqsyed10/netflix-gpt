//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNCwuVPN-5JhV_JUD3b-4nlfRsMaZC1Hw",
  authDomain: "netflix-gpt00.firebaseapp.com",
  projectId: "netflix-gpt00",
  storageBucket: "netflix-gpt00.appspot.com",
  messagingSenderId: "946371895767",
  appId: "1:946371895767:web:185e51a3dd96147d512b92",
  measurementId: "G-7YQ9D9BT54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();