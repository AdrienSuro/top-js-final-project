import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp, firebase } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore, query, collection } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import profilePlaceholder from "../img/profile_placeholder.jpeg";
import { toggleIsLoggedIn, selectIsLoggedIn, setName } from "./userSlice.js";

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
export const tweetsCollection = query(collection(db, "tweets"));
export const auth = getAuth();

// AFTER IMPLEMENTING REDUX TOOLKIT, use the share states to updated userName, userPic from here so that it gets updated in the App or User components

export async function signIn() {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export const myFunc = onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("onAuth check : userisSignedIn");
    console.log(user.toJSON().displayName);
    return user.toJSON().displayName;
  } else {
    return "NO USER";
    console.log("onAuth check : user is Signed Out");
  }
});

export function signOutUser() {
  signOut(getAuth());
  console.log("user signed out");
}

export function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  const currentUser = getAuth().currentUser;
  return currentUser ? currentUser.photoURL : profilePlaceholder;
}

// Returns the signed-in user's display name.
export function getUserName() {
  const currentUser = getAuth().currentUser;
  return currentUser ? currentUser.displayName : null;
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

export function authStateObserver(user) {
  if (user) {
    console.log("user signed in");
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    // userPicElement.style.backgroundImage =
    //   "url(" + addSizeToGoogleProfilePic(profilePicUrl) + ")";
    // userNameElement.textContent = userName;

    // We save the Firebase Messaging Device token and enable notifications.
    // saveMessagingDeviceToken();
  } else {
    console.log("no user");
    // // User is signed out!
    // // Hide user's profile and sign-out button.
    // userNameElement.setAttribute("hidden", "true");
    // userPicElement.setAttribute("hidden", "true");
    // signOutButtonElement.setAttribute("hidden", "true");

    // // Show sign-in button.
    // signInButtonElement.removeAttribute("hidden");
  }
}
