// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2KlFGgswR940E_sf2h-uVhwGhwV5jzZU",
    authDomain: "marketmatefx.firebaseapp.com",
    projectId: "marketmatefx",
    storageBucket: "marketmatefx.appspot.com",
    messagingSenderId: "757656529739",
    appId: "1:757656529739:web:0e5658f86e5cc5c13cd6ce",
    
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the authentication service
const auth = getAuth(app);

export { auth };
