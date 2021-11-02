import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCQdvRqH-zhMaQpGlWPvUljpEzjtjKV17A",
  authDomain: "keep-clone-63769.firebaseapp.com",
  projectId: "keep-clone-63769",
  storageBucket: "keep-clone-63769.appspot.com",
  messagingSenderId: "909800099999",
  appId: "1:909800099999:web:deb0dda4d2fe93464a12aa"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;