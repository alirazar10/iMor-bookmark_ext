// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCWlgT6rQScAaJYDeVW9ac8HGSbRjgo-YQ",
  authDomain: "imor-bookmarks.firebaseapp.com",
  projectId: "imor-bookmarks",
  storageBucket: "imor-bookmarks.appspot.com",
  messagingSenderId: "309556020738",
  appId: "1:309556020738:web:f1b37455274507bf25491b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
