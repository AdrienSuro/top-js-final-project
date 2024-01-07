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
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setLoginType } from "../redux/userSlice.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const tweetsCollection = query(collection(db, "tweets"));
export const auth = getAuth();

export async function connectWithEmail(auth, email, password) {
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

export async function signUpWithGoogle() {
  try {
    console.log("signed in with google");
    // cannot put useDispatch here !!!!
    var provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error) {
    return { error: error.message };
  }
}

export async function createUserWithEmail(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    // ...
  } catch (error) {
    console.log("error");
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    console.log(error.code);
    console.log(error.message);
    return error.code;
    // ..
  }
}

export function signOutUser() {
  signOut(getAuth());
}
