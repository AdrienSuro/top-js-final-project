import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, signIn } from "./Firebase.js";

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  selectTweets,
  selectAge,
  incrementAge,
  selectIsLoggedIn,
  setName,
  selectName,
} from "./userSlice.js";

export default function User() {
  const tweets = useSelector(selectTweets);
  const age = useSelector(selectAge);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectName);
  const dispatch = useDispatch();
  const user = auth.currentUser;

  async function signInUser() {
    return signIn()
      .then((result) => {
        console.log("user signed in");
        dispatch(setName(user.displayName));
      })
      .catch((error) => {
        console.log("user sign in failed");
      });
  }

  return (
    <div>
      <ul>
        {tweets.map((tweet) => (
          <li>{tweet}</li>
        ))}
      </ul>
      {userName}
      <button onClick={() => signInUser()}>Sign In inside User</button>
      {isLoggedIn ? "logged in" : "not logged in"}
    </div>
  );
}
