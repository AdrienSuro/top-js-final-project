import { initializeApp, firebase } from "firebase/app";
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
} from "firebase/auth";
import profilePlaceholder from "../img/profile_placeholder.jpeg";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const tweetsCollection = query(collection(db, "tweets"));
export const auth = getAuth();

export async function signIn() {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export function signOutUser() {
  signOut(getAuth());
}
