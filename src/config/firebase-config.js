// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPuJ9NrNgl5zoOpyqWVbESkpFu3A9fHcY",
  authDomain: "instapic-966ac.firebaseapp.com",
  projectId: "instapic-966ac",
  storageBucket: "instapic-966ac.appspot.com",
  messagingSenderId: "926796911590",
  appId: "1:926796911590:web:490f129bd973377b97fc27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);