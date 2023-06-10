import { initializeApp, firebase } from "firebase/app";
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

const firebaseConfig = {
  apiKey: "AIzaSyCXfjM2GwVLeV0-6mh85hbMnZz9xBWIkOk",
  authDomain: "top-js-final-project.firebaseapp.com",
  projectId: "top-js-final-project",
  storageBucket: "top-js-final-project.appspot.com",
  messagingSenderId: "405318354823",
  appId: "1:405318354823:web:f0459bf90cbf42a970f522",
};

const app = initializeApp(firebaseConfig);
console.log("hi from Firebase.js");
export const db = getFirestore(app);
export const tweetsCollection = query(collection(db, "tweets"));
export const auth = getAuth();
let currentUser = null;

export async function signIn() {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export function signOutUser() {
  signOut(getAuth());
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  currentUser = getAuth().currentUser;
  return currentUser ? currentUser.photoURL : profilePlaceholder;
}

// Returns the signed-in user's display name.
export function getUserDisplayName() {
  currentUser = getAuth().currentUser;
  return currentUser ? currentUser.displayName : null;
}

export function getUserToken() {
  currentUser = getAuth().currentUser;
  return currentUser ? currentUser.getToken() : null;
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// Returns an user object from Firebase, with props (ex: following, followers, description etc)
export function getUserDescription(username) {
  onSnapshot(doc(db, "users", username), (doc) => {
    return doc.data().description;
  });
}
