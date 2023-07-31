// ******* IMPORTS ******* //
import { v4 as uuidv4 } from "uuid";
import { initializeApp, firebase } from "firebase/app";
import { db, getProfilePicUrl } from "../api/Firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  querySnapshot,
  query,
  where,
  collection,
  getDocs,
  docRef,
} from "firebase/firestore";
import firebaseConfig from "./FirebaseConfig";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setLoginType } from "../redux/userSlice.js";

const app = initializeApp(firebaseConfig);
export const tweetsCollection = query(collection(db, "tweets"));
export const auth = getAuth();

export function connectWithEmail(email, password) {
  // will check existing user ???
  // will connect to email account
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function connectWithGoogle() {
  try {
    console.log("signed in with google");
    var provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error) {
    return { error: error.message };
  }
}
