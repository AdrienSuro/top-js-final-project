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

const app = initializeApp(firebaseConfig);
export const tweetsCollection = query(collection(db, "tweets"));
export const auth = getAuth();

export function connectWithEmail(email, password) {
  // will check existing user ???
  // will connect to email account
  console.log(email + " " + password);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log("connected as " + user);
    })
    .catch((error) => {
      console.log(email + " " + password);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("login failed " + errorCode + errorMessage);
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
