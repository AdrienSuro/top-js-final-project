import { initializeApp, firebase } from "firebase/app";
import { useSelector, useDispatch } from "react-redux";
import firebaseConfig from "./FirebaseConfig";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getFirestore,
  query,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setLoginType } from "../redux/userSlice.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const tweetsCollection = query(collection(db, "tweets"));
export const auth = getAuth();

export async function signInWithGoogle() {
  try {
    // cannot put useDispatch here !!!!
    var provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error) {
    return { error: error.message };
  }
}

export async function createUserWithEmail(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export function signOutUser() {
  signOut(getAuth());
}
