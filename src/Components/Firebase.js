import { initializeApp, firebase } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore, query, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXfjM2GwVLeV0-6mh85hbMnZz9xBWIkOk",
  authDomain: "top-js-final-project.firebaseapp.com",
  projectId: "top-js-final-project",
  storageBucket: "top-js-final-project.appspot.com",
  messagingSenderId: "405318354823",
  appId: "1:405318354823:web:f0459bf90cbf42a970f522",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const q = query(collection(db, "tweets"));
